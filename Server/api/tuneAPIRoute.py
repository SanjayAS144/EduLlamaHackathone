from fastapi import APIRouter
from dataHandlers.CourceHandler import CourceHandler
from schemas.requests import (
    ChatHistoryRequest,
    CurriculumCreateRequest,
    Tutor,
    TutorThread,
)
from prompts.curriculum_prompt_generator import CurriculumPromptGenerator
from Requests import TuneRequests
from constants import TUNEAPPURL
import requests
from dataHandlers.curriculum_response_handler import CurriculumDataHandler

router = APIRouter()


@router.post("/Curriculum")
def CreateCurriculum(payload: CurriculumCreateRequest):
    curriculumDataHandler = CurriculumDataHandler()
    if curriculumDataHandler.isCurriculumExists(payload.subtopic):
        return {"Response": curriculumDataHandler.getCurriculumData(payload.subtopic)}
    curriculum_prompt_generator = CurriculumPromptGenerator(payload)
    curriculum_prompt = curriculum_prompt_generator.generate_prompt()
    system_prompt = curriculum_prompt_generator.getSystem_prompt()
    message = [{"role": "user", "content": curriculum_prompt}]
    tune_requests = TuneRequests(system_prompt)
    headers, data = tune_requests.get_requests(message)
    response = requests.post(TUNEAPPURL, headers=headers, json=data)
    content = response.json()["choices"][0]["message"]["content"]
    final_response = curriculumDataHandler.saveResponse(content, payload.subtopic)
    return final_response


@router.get("/Curriculum")
def getALlCurriculum():
    curriculumDataHandler = CurriculumDataHandler()
    return {"Response": curriculumDataHandler.getAllCurriculumData()}


@router.post("/converse")
def getCurriculum(tutor: Tutor):
    print(tutor)
    courseHandler = CourceHandler()
    userMessage = tutor.userMessages
    system_prompt = [{"role": "system", "content": courseHandler.getSystemPrompt()}]
    tune_requests = TuneRequests(system_prompt)
    headers, data = tune_requests.get_requests(userMessage)
    print(data)
    response = requests.post(TUNEAPPURL, headers=headers, json=data)
    content = response.json()["choices"][0]["message"]
    return content


@router.post("/chatThread")
def getCurriculum(tutor: TutorThread):
    print(tutor)
    userMessage = tutor.userMessage
    userData = {"role": "user", "content": userMessage}
    courseHandler = CourceHandler()
    history = courseHandler.getHistory(tutor.dayNumber, tutor.topic)
    history.append(userData)
    system_prompt = [{"role": "system", "content": courseHandler.getSystemPrompt()}]
    tune_requests = TuneRequests(system_prompt)
    headers, data = tune_requests.get_requests(history)
    print(data)
    response = requests.post(TUNEAPPURL, headers=headers, json=data)
    content = response.json()["choices"][0]["message"]
    history.append(content)
    courseHandler.saveHistory(tutor.dayNumber, tutor.topic, history)
    return content


@router.get("/converse/{topic}/{dayNumber}")
def getChatHistory(topic: str, dayNumber: str):
    print(topic, dayNumber)
    courseHandler = CourceHandler()
    Histrory = courseHandler.getHistory(dayNumber, topic)
    print(Histrory)
    return Histrory
