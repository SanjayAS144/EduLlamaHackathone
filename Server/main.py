import os
from fastapi import FastAPI, UploadFile, File, Depends
from datetime import datetime
import time
import uvicorn
from fastapi.responses import JSONResponse
import asyncio
import uuid
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.responses import FileResponse
from pathlib import Path
from api.tuneAPIRoute import router as tune_router


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # You can specify HTTP methods like ["GET", "POST"]
    allow_headers=["*"],  # You can specify specific headers here
)

app.include_router(tune_router, prefix="/api/v1/tune")


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}


if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, host="0.0.0.0", reload=True)
