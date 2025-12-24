"""Scoring API routes"""

from fastapi import APIRouter, HTTPException
from models.schemas import ScoringRequest, ScoringResponse
from agents.scoring_agent import ScoringAgent

router = APIRouter()
agent = ScoringAgent()


@router.post("/score", response_model=ScoringResponse)
async def score_lead(request: ScoringRequest):
    """
    Score a lead based on ICP criteria.
    
    - **lead**: Lead information
    - **icp_criteria**: Optional custom ICP criteria
    """
    try:
        result = await agent.process({
            "lead": request.lead.model_dump(),
            "icp_criteria": request.icp_criteria
        })
        return ScoringResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

