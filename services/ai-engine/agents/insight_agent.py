"""Insight Agent for generating strategic recommendations"""

from typing import Dict, Any, List
from langchain_core.messages import SystemMessage, HumanMessage
from agents.base import BaseAgent
from utils.prompts import INSIGHT_AGENT_PROMPT


class InsightAgent(BaseAgent):
    """Agent for generating strategic insights about leads"""
    
    def __init__(self):
        super().__init__(temperature=0.5)
    
    async def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate insights for a lead"""
        lead = input_data.get("lead", {})
        insight_types = input_data.get("insight_types", ["general"])
        
        # Build context
        context = self._build_context(lead)
        
        messages = [
            SystemMessage(content=INSIGHT_AGENT_PROMPT),
            HumanMessage(content=f"""
Generate strategic insights for the following lead.

Lead Information:
{context}

Requested Insight Types: {', '.join(insight_types)}

Provide actionable insights in JSON format.
""")
        ]
        
        response = await self.llm.ainvoke(messages)
        result = self._parse_json_response(response.content)
        
        # Add lead_id to result
        result["lead_id"] = lead.get("id", "unknown")
        
        # Ensure all required fields exist
        defaults = {
            "insights": [],
            "priority_score": 50
        }
        
        for key, default in defaults.items():
            if key not in result:
                result[key] = default
        
        # Filter insights by requested types
        if result.get("insights"):
            result["insights"] = [
                i for i in result["insights"]
                if i.get("type", "general").lower() in [t.lower() for t in insight_types]
                or "general" in insight_types
            ]
        
        return result
    
    def _build_context(self, lead: Dict[str, Any]) -> str:
        """Build context string from lead data"""
        parts = []
        
        if lead.get("company_name"):
            parts.append(f"Company: {lead['company_name']}")
        if lead.get("contact_name"):
            parts.append(f"Contact: {lead['contact_name']}")
        if lead.get("industry"):
            parts.append(f"Industry: {lead['industry']}")
        if lead.get("employee_count"):
            parts.append(f"Company Size: {lead['employee_count']} employees")
        if lead.get("revenue"):
            parts.append(f"Revenue: {lead['revenue']}")
        if lead.get("location"):
            parts.append(f"Location: {lead['location']}")
        if lead.get("stage"):
            parts.append(f"Current Stage: {lead['stage']}")
        if lead.get("description"):
            parts.append(f"Notes: {lead['description']}")
        
        return "\n".join(parts) if parts else "Limited information available"

