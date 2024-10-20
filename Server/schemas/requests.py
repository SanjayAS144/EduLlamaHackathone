from pydantic import BaseModel, PositiveInt
from typing import Dict, List, Optional


class BaseRequest(BaseModel):
    # may define additional fields or config shared across requests
    pass


class CurriculumCreateRequest(BaseRequest):
    subject: str
    subtopic: str
    student_level: str
    total_duration: PositiveInt
    preferred_learning_style: Optional[str] = None


class Tutor(BaseRequest):
    topic: str
    subtopic: str
    dayNumber: str
    userMessages: List[Dict]


class TutorThread(BaseRequest):
    topic: str
    subtopic: str
    dayNumber: str
    userMessage: str


class ChatHistoryRequest(BaseRequest):
    topic: str
    dayNumber: str
