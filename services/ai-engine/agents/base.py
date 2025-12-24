"""Base agent class for all AI agents"""

from abc import ABC, abstractmethod
from typing import Any, Dict
from langchain_openai import ChatOpenAI
from config import settings


class BaseAgent(ABC):
    """Base class for all AI agents"""
    
    def __init__(self, model: str = None, temperature: float = 0.7):
        self.model = model or settings.openai_model
        self.temperature = temperature
        self.llm = self._create_llm()
    
    def _create_llm(self) -> ChatOpenAI:
        """Create the LLM instance"""
        return ChatOpenAI(
            model=self.model,
            temperature=self.temperature,
            api_key=settings.openai_api_key,
        )
    
    @abstractmethod
    async def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Process input and return results"""
        pass
    
    def _parse_json_response(self, response: str) -> Dict[str, Any]:
        """Parse JSON from LLM response"""
        import json
        
        # Try to extract JSON from markdown code blocks
        if "```json" in response:
            start = response.find("```json") + 7
            end = response.find("```", start)
            response = response[start:end].strip()
        elif "```" in response:
            start = response.find("```") + 3
            end = response.find("```", start)
            response = response[start:end].strip()
        
        try:
            return json.loads(response)
        except json.JSONDecodeError:
            # Return a default structure if parsing fails
            return {"error": "Failed to parse response", "raw": response}

