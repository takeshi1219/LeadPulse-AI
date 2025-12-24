"""Research API routes"""

from fastapi import APIRouter, HTTPException
from models.schemas import ResearchRequest, ResearchResponse
from agents.research_agent import ResearchAgent

router = APIRouter()
agent = ResearchAgent()


@router.post("/research", response_model=ResearchResponse)
async def research_company(request: ResearchRequest):
    """
    Research a company and provide insights.
    
    - **lead**: Lead information including company details
    - **depth**: Research depth (quick, standard, deep)
    """
    try:
        result = await agent.process({
            "lead": request.lead.model_dump(),
            "depth": request.depth
        })
        return ResearchResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

