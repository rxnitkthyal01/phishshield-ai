from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "PhishShield AI"
    API_V1_STR: str = "/api/v1"
    
    # AI Keys
    GEMINI_API_KEY: str | None = None
    OPENAI_API_KEY: str | None = None
    
    # Threat Intel
    VIRUSTOTAL_API_KEY: str | None = None
    
    # Database
    DATABASE_URL: str = "postgresql://user:pass@localhost/phishshield"
    
    class Config:
        env_file = ".env"

settings = Settings()
