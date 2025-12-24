"""Insights API routes"""

from fastapi import APIRouter, HTTPException
from models.schemas import InsightRequest, InsightResponse
from agents.insight_agent import InsightAgent

router = APIRouter()
agent = InsightAgent()


@router.post("/insights", response_model=InsightResponse)
async def generate_insights(request: InsightRequest):
    """
    Generate strategic insights for a lead.
    
    - **lead**: Lead information
    - **insight_types**: Types of insights to generate (general, opportunity, risk, next_action)
    """
    try:
        result = await agent.process({
            "lead": request.lead.model_dump(),
            "insight_types": request.insight_types
        })
        return InsightResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

