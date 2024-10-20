from typing import Tuple
from constants import TUNEAPIKEY, TUNEAPPURL, CURRICULUMMODEL


class TuneRequests:
    def __init__(self, system_promt):
        self.messages = [{"role": "system", "content": system_promt}]

    def get_requests(self, messages) -> Tuple[dict, dict]:
        self.messages.extend(messages)
        headers = {
            "Authorization": TUNEAPIKEY,
            "Content-Type": "application/json",
        }
        data = {
            "temperature": 0.8,
            "messages": self.messages,
            "model": CURRICULUMMODEL,
            "stream": False,
            "frequency_penalty": 0,
            "max_tokens": 900,
        }

        return (headers, data)
