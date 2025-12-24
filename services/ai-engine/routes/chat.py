"""Chat API routes"""

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from models.schemas import ChatRequest, ChatResponse
from utils.prompts import CHAT_SYSTEM_PROMPT
from config import settings
import json

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat with the AI sales assistant.
    
    - **messages**: Conversation history
    - **lead_context**: Optional lead context for personalized responses
    - **organization_id**: Organization identifier
    """
    try:
        llm = ChatOpenAI(
            model=settings.openai_model,
            temperature=0.7,
            api_key=settings.openai_api_key,
        )
        
        # Build system prompt with optional lead context
        system_content = CHAT_SYSTEM_PROMPT
        if request.lead_context:
            lead = request.lead_context
            system_content += f"""

Current Lead Context:
- Company: {lead.company_name}
- Contact: {lead.contact_name or 'Unknown'}
- Industry: {lead.industry or 'Unknown'}
- Stage: {lead.stage or 'Unknown'}
- Description: {lead.description or 'No description'}
"""
        
        # Build message list
        messages = [SystemMessage(content=system_content)]
        
        for msg in request.messages:
            if msg.role == "user":
                messages.append(HumanMessage(content=msg.content))
            else:
                messages.append(AIMessage(content=msg.content))
        
        # Get response
        response = await llm.ainvoke(messages)
        
        # Generate suggestions
        suggestions = [
            "Tell me more about this company",
            "What should be my next action?",
            "Draft a follow-up email",
        ]
        
        return ChatResponse(
            message=response.content,
            suggestions=suggestions
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    """
    Stream chat responses for real-time display.
    """
    try:
        llm = ChatOpenAI(
            model=settings.openai_model,
            temperature=0.7,
            api_key=settings.openai_api_key,
            streaming=True,
        )
        
        # Build system prompt with optional lead context
        system_content = CHAT_SYSTEM_PROMPT
        if request.lead_context:
            lead = request.lead_context
            system_content += f"""

Current Lead Context:
- Company: {lead.company_name}
- Contact: {lead.contact_name or 'Unknown'}
- Industry: {lead.industry or 'Unknown'}
- Stage: {lead.stage or 'Unknown'}
"""
        
        # Build message list
        messages = [SystemMessage(content=system_content)]
        
        for msg in request.messages:
            if msg.role == "user":
                messages.append(HumanMessage(content=msg.content))
            else:
                messages.append(AIMessage(content=msg.content))
        
        async def generate():
            async for chunk in llm.astream(messages):
                if chunk.content:
                    yield f"data: {json.dumps({'content': chunk.content})}\n\n"
            yield "data: [DONE]\n\n"
        
        return StreamingResponse(
            generate(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

