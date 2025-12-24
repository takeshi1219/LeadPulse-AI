"""Research Agent for company analysis"""

from typing import Dict, Any
from langchain_core.messages import SystemMessage, HumanMessage
from agents.base import BaseAgent
from utils.prompts import RESEARCH_AGENT_PROMPT


class ResearchAgent(BaseAgent):
    """Agent for researching companies and contacts"""
    
    def __init__(self):
        super().__init__(temperature=0.3)  # Lower temperature for factual responses
    
    async def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Research a company based on lead data"""
        lead = input_data.get("lead", {})
        depth = input_data.get("depth", "standard")
        
        # Build context from lead data
        context = self._build_context(lead)
        
        messages = [
            SystemMessage(content=RESEARCH_AGENT_PROMPT),
            HumanMessage(content=f"""
Research the following company. Depth: {depth}

Company Information:
{context}

Provide a comprehensive analysis in JSON format.
""")
        ]
        
        response = await self.llm.ainvoke(messages)
        result = self._parse_json_response(response.content)
        
        # Add lead_id to result
        result["lead_id"] = lead.get("id", "unknown")
        
        # Ensure all required fields exist
        defaults = {
            "company_summary": "Unable to generate summary",
            "key_insights": [],
            "decision_makers": [],
            "recent_news": [],
            "funding_info": None,
            "tech_stack": [],
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
            parts.append(f"Company Name: {lead['company_name']}")
        if lead.get("website"):
            parts.append(f"Website: {lead['website']}")
        if lead.get("industry"):
            parts.append(f"Industry: {lead['industry']}")
        if lead.get("employee_count"):
            parts.append(f"Employee Count: {lead['employee_count']}")
        if lead.get("revenue"):
            parts.append(f"Revenue: {lead['revenue']}")
        if lead.get("location"):
            parts.append(f"Location: {lead['location']}")
        if lead.get("contact_name"):
            parts.append(f"Contact: {lead['contact_name']}")
        if lead.get("description"):
            parts.append(f"Description: {lead['description']}")
        
        return "\n".join(parts)

