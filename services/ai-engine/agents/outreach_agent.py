"""Outreach Agent for generating personalized content"""

from typing import Dict, Any
from langchain_core.messages import SystemMessage, HumanMessage
from agents.base import BaseAgent
from utils.prompts import OUTREACH_AGENT_PROMPT


class OutreachAgent(BaseAgent):
    """Agent for generating personalized outreach content"""
    
    def __init__(self):
        super().__init__(temperature=0.7)  # Higher temperature for creative content
    
    async def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate personalized outreach content"""
        lead = input_data.get("lead", {})
        outreach_type = input_data.get("outreach_type", "email")
        tone = input_data.get("tone", "professional")
        goal = input_data.get("goal", "schedule a discovery call")
        
        # Build context
        context = self._build_context(lead)
        
        # Customize prompt
        system_prompt = OUTREACH_AGENT_PROMPT.format(tone=tone, goal=goal)
        
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=f"""
Generate a {outreach_type} for the following lead.

Lead Information:
{context}

Outreach Type: {outreach_type}
Tone: {tone}
Goal: {goal}

Create compelling, personalized content in JSON format.
""")
        ]
        
        response = await self.llm.ainvoke(messages)
        result = self._parse_json_response(response.content)
        
        # Add metadata to result
        result["lead_id"] = lead.get("id", "unknown")
        result["outreach_type"] = outreach_type
        
        # Ensure all required fields exist
        defaults = {
            "subject": None if outreach_type != "email" else "Quick question",
            "content": "Unable to generate content",
            "best_send_time": "Tuesday 10:00 AM",
            "follow_up_suggestions": [],
            "confidence": 0.5
        }
        
        for key, default in defaults.items():
            if key not in result:
                result[key] = default
        
        return result
    
    def _build_context(self, lead: Dict[str, Any]) -> str:
        """Build context string from lead data"""
        parts = []
        
        if lead.get("company_name"):
            parts.append(f"Company: {lead['company_name']}")
        if lead.get("contact_name"):
            parts.append(f"Contact Name: {lead['contact_name']}")
        if lead.get("industry"):
            parts.append(f"Industry: {lead['industry']}")
        if lead.get("employee_count"):
            parts.append(f"Company Size: {lead['employee_count']} employees")
        if lead.get("revenue"):
            parts.append(f"Revenue: {lead['revenue']}")
        if lead.get("location"):
            parts.append(f"Location: {lead['location']}")
        if lead.get("description"):
            parts.append(f"Notes: {lead['description']}")
        if lead.get("website"):
            parts.append(f"Website: {lead['website']}")
        
        return "\n".join(parts) if parts else "Limited information available"

