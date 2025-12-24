from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routes import research, scoring, outreach, chat, insights

app = FastAPI(
    title=settings.app_name,
    description="AI-powered sales intelligence API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(research.router, prefix=settings.api_prefix, tags=["Research"])
app.include_router(scoring.router, prefix=settings.api_prefix, tags=["Scoring"])
app.include_router(outreach.router, prefix=settings.api_prefix, tags=["Outreach"])
app.include_router(chat.router, prefix=settings.api_prefix, tags=["Chat"])
app.include_router(insights.router, prefix=settings.api_prefix, tags=["Insights"])


@app.get("/")
async def root():
    return {
        "name": settings.app_name,
        "version": "1.0.0",
        "status": "healthy",
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.port,
        reload=settings.debug
    )

