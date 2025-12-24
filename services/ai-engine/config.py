import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from typing import List

load_dotenv()


class Settings(BaseSettings):
    """Application settings"""
    
    # API Settings
    app_name: str = "LeadPulse AI Engine"
    debug: bool = os.getenv("DEBUG", "false").lower() == "true"
    api_prefix: str = "/api"
    
    # OpenAI
    openai_api_key: str = ""
    openai_model: str = "gpt-4-turbo-preview"
    
    # Redis (optional caching)
    redis_url: str = ""
    
    # CORS - Allow production URLs
    cors_origins: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        os.getenv("FRONTEND_URL", ""),
    ]
    
    # Port for Railway
    port: int = int(os.getenv("PORT", "8000"))
    
    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "extra": "ignore",
    }
    
    def get_cors_origins(self) -> List[str]:
        """Get filtered CORS origins (remove empty strings)"""
        return [origin for origin in self.cors_origins if origin]


settings = Settings()

