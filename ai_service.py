import google.generativeai as genai
from app.core.config import settings
from app.schemas.analysis import AnalysisRequest, AnalysisResponse
import json

class AIService:
    def __init__(self):
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.model = None

    async def analyze_threat(self, request: AnalysisRequest) -> AnalysisResponse:
        if not self.model:
            return AnalysisResponse(
                risk_score=0,
                threat_level="Unknown",
                justification="AI analysis skipped: No API key configured.",
                is_impersonation=False
            )

        prompt = f"""
        Analyze the following website data for phishing or brand impersonation:
        URL: {request.url}
        Page Title: {request.page_title}
        Meta Tags: {json.dumps(request.meta_tags)}
        Brand Claims: {request.brand_claims}

        Is this website pretending to be a well-known brand?
        Return a JSON object with:
        - risk_score (0-100)
        - threat_level (Safe, Low, Medium, High, Critical)
        - detected_brand (The name of the brand being impersonated, or null)
        - is_impersonation (boolean)
        - justification (short explanation)
        """

        try:
            response = self.model.generate_content(prompt)
            # Basic parsing of the response (ideally use constrained output/schema)
            # For this MVP, we'll try to find the JSON block
            text = response.text
            start = text.find('{')
            end = text.rfind('}') + 1
            data = json.loads(text[start:end])
            
            return AnalysisResponse(**data)
        except Exception as e:
            return AnalysisResponse(
                risk_score=50,
                threat_level="Medium",
                justification=f"AI analysis failed: {str(e)}",
                is_impersonation=False
            )
