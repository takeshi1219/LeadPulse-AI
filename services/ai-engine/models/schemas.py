from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum


class LeadStage(str, Enum):
    NEW = "NEW"
    CONTACTED = "CONTACTED"
    QUALIFIED = "QUALIFIED"
    PROPOSAL = "PROPOSAL"
    WON = "WON"
    LOST = "LOST"


class LeadData(BaseModel):
    """Lead information for AI processing"""
    id: str
    company_name: str
    contact_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    website: Optional[str] = None
    industry: Optional[str] = None
    employee_count: Optional[int] = None
    revenue: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    stage: Optional[LeadStage] = LeadStage.NEW


class ResearchRequest(BaseModel):
    """Request for company research"""
    lead: LeadData
    depth: str = Field(default="standard", description="Research depth: quick, standard, deep")


class ResearchResponse(BaseModel):
    """Company research results"""
    lead_id: str
    company_summary: str
    key_insights: List[str]
    decision_makers: List[dict]
    recent_news: List[str]
    funding_info: Optional[str] = None
    tech_stack: List[str]
    confidence: float


class ScoringRequest(BaseModel):
    """Request for lead scoring"""
    lead: LeadData
    icp_criteria: Optional[dict] = None


class ScoringFactor(BaseModel):
    """Individual scoring factor"""
    name: str
    score: int = Field(ge=0, le=100)
    reason: str
    weight: float = Field(default=1.0)


class ScoringResponse(BaseModel):
    """Lead scoring results"""
    lead_id: str
    overall_score: int = Field(ge=0, le=100)
    factors: List[ScoringFactor]
    recommendation: str
    confidence: float


class OutreachRequest(BaseModel):
    """Request for outreach content generation"""
    lead: LeadData
    outreach_type: str = Field(default="email", description="email, linkedin, call_script")
    tone: str = Field(default="professional", description="professional, casual, formal")
    goal: Optional[str] = None


class OutreachResponse(BaseModel):
    """Generated outreach content"""
    lead_id: str
    outreach_type: str
    subject: Optional[str] = None
    content: str
    best_send_time: str
    follow_up_suggestions: List[str]
    confidence: float


class ChatMessage(BaseModel):
    """Chat message"""
    role: str = Field(description="user or assistant")
    content: str


class ChatRequest(BaseModel):
    """Request for AI chat"""
    messages: List[ChatMessage]
    lead_context: Optional[LeadData] = None
    organization_id: str


class ChatResponse(BaseModel):
    """Chat response"""
    message: str
    suggestions: List[str]


class InsightRequest(BaseModel):
    """Request for lead insights"""
    lead: LeadData
    insight_types: List[str] = Field(
        default=["general"],
        description="Types: general, opportunity, risk, next_action"
    )


class Insight(BaseModel):
    """Individual insight"""
    type: str
    title: str
    description: str
    action: Optional[str] = None
    confidence: float


class InsightResponse(BaseModel):
    """Lead insights results"""
    lead_id: str
    insights: List[Insight]
    priority_score: int

