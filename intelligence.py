from fastapi import APIRouter
from app.services.intelligence_service import IntelligenceService

router = APIRouter()

@router.get("/reputation")
async def get_reputation(url: str):
    intel_service = IntelligenceService()
    vt_res = await intel_service.get_url_reputation(url)
    pt_res = await intel_service.check_phishtank(url)
    
    return {
        "url": url,
        "virustotal": vt_res,
        "phishtank": pt_res
    }
