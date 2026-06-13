from fastapi import APIRouter
from app.api.endpoints import analysis, intelligence

api_router = APIRouter()
api_router.include_router(analysis.router, prefix="/analyze", tags=["analysis"])
api_router.include_router(intelligence.router, prefix="/intel", tags=["intelligence"])
