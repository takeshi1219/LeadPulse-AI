"""Scoring Agent for lead qualification"""

from typing import Dict, Any
from langchain_core.messages import SystemMessage, HumanMessage
from agents.base import BaseAgent
from utils.prompts import SCORING_AGENT_PROMPT


class ScoringAgent(BaseAgent):
    """Agent for scoring and qualifying leads"""
    
    def __init__(self):
        super().__init__(temperature=0.2)  # Low temperature for consistent scoring
    
    async def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Score a lead based on qualification criteria"""
        lead = input_data.get("lead", {})
        icp_criteria = input_data.get("icp_criteria", self._default_icp())
        
        # Build context
        context = self._build_context(lead)
        icp_context = self._build_icp_context(icp_criteria)
        
        messages = [
            SystemMessage(content=SCORING_AGENT_PROMPT),
            HumanMessage(content=f"""
Score the following lead against our Ideal Customer Profile (ICP).

Lead Information:
{context}

Ideal Customer Profile:
{icp_context}

Provide detailed scoring in JSON format.
""")
        ]
        
        response = await self.llm.ainvoke(messages)
        result = self._parse_json_response(response.content)
        
        # Add lead_id to result
        result["lead_id"] = lead.get("id", "unknown")
        
        # Ensure all required fields exist
        defaults = {
            "overall_score": 50,
            "factors": [],
            "recommendation": "nurture",
            "confidence": 0.5
        }
        
        for key, default in defaults.items():
            if key not in result:
                result[key] = default
        
        # Validate score range
        result["overall_score"] = max(0, min(100, result["overall_score"]))
        
        return result
    
    def _build_context(self, lead: Dict[str, Any]) -> str:
        """Build context string from lead data"""
        parts = []
        
        if lead.get("company_name"):
            parts.append(f"Company: {lead['company_name']}")
        if lead.get("industry"):
            parts.append(f"Industry: {lead['industry']}")
        if lead.get("employee_count"):
            parts.append(f"Employees: {lead['employee_count']}")
        if lead.get("revenue"):
            parts.append(f"Revenue: {lead['revenue']}")
        if lead.get("location"):
            parts.append(f"Location: {lead['location']}")
        if lead.get("stage"):
            parts.append(f"Current Stage: {lead['stage']}")
        if lead.get("contact_name"):
            parts.append(f"Contact: {lead['contact_name']}")
        if lead.get("email"):
            parts.append(f"Email: {lead['email']}")
        
        return "\n".join(parts) if parts else "Limited information available"
    
    def _build_icp_context(self, icp: Dict[str, Any]) -> str:
        """Build ICP context string"""
        parts = []
        
        for key, value in icp.items():
            parts.append(f"{key}: {value}")
        
        return "\n".join(parts)
    
    def _default_icp(self) -> Dict[str, Any]:
        """Default ICP criteria"""
        return {
            "target_industries": "Technology, SaaS, Software, Finance",
            "company_size": "50-1000 employees",
            "revenue_range": "$5M - $100M",
            "geography": "North America, Europe",
            "decision_maker_titles": "CTO, VP Engineering, Director of IT",
            "budget_authority": "Ability to make $10K+ purchasing decisions"
        }

