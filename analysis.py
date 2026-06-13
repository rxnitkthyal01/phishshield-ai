from typing import List
from pydantic import BaseModel

class AnalysisRequest(BaseModel):
    url: str
    page_title: str | None = None
    meta_tags: dict | None = None
    brand_claims: List[str] | None = None

class AnalysisResponse(BaseModel):
    risk_score: int
    threat_level: str
    justification: str
    detected_brand: str | None = None
    is_impersonation: bool
