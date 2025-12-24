"""Outreach API routes"""

from fastapi import APIRouter, HTTPException
from models.schemas import OutreachRequest, OutreachResponse
from agents.outreach_agent import OutreachAgent

router = APIRouter()
agent = OutreachAgent()


@router.post("/outreach", response_model=OutreachResponse)
async def generate_outreach(request: OutreachRequest):
    """
    Generate personalized outreach content.
    
    - **lead**: Lead information
    - **outreach_type**: Type of outreach (email, linkedin, call_script)
    - **tone**: Message tone (professional, casual, formal)
    - **goal**: Outreach goal
    """
    try:
        result = await agent.process({
            "lead": request.lead.model_dump(),
            "outreach_type": request.outreach_type,
            "tone": request.tone,
            "goal": request.goal
        })
        return OutreachResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

