import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    """Application settings"""
    
    # API Settings
    app_name: str = "LeadPulse AI Engine"
    debug: bool = True
    api_prefix: str = "/api"
    
    # OpenAI
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
    openai_model: str = "gpt-4-turbo-preview"
    
    # Redis (optional caching)
    redis_url: str = os.getenv("REDIS_URL", "")
    
    # CORS
    cors_origins: list[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    
    class Config:
        env_file = ".env"


settings = Settings()

