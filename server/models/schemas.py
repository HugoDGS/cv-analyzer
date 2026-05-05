from pydantic import BaseModel
from typing import Optional


class SectionFeedback(BaseModel):
    present: bool
    quality: str
    note: str


class CVAnalysis(BaseModel):
    score: int
    summary: str
    strengths: list[str]
    weaknesses: list[str]
    suggestions: list[str]
    sections: dict[str, SectionFeedback]
    job_match_score: Optional[int] = None
    job_match_notes: Optional[str] = None
