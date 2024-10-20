import re
import logging
import io
import base64
import matplotlib.pyplot as plt
import numpy as np
from plotly import graph_objects as go
import requests
from flask import Flask, request, jsonify
import pyaudio
import wave
from groq import Groq

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

app = Flask(__name__)

# LLM API Key
llm_api_key = "sk-tune-tWdlAZ7UylGzyEt7SNxFMly8eJVBHRJHgkj"
client = Groq(api_key="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")

# System prompt for visualizations
sys_prompt_artifacts = """
The assistant can create and reference interactive Python visualizations during conversations to educate students visually and make learning more fun and engaging. These visualizations should explain mathematical and scientific concepts in an interactive and visually appealing manner.
...
"""

# System prompt for TTSTuneAI
sys_prompt_tts = """
You are a highly skilled interactive math tutor designed to adapt your teaching style based on the student's skill level. Your primary goal is to teach math concepts in a way that is simple, engaging, and easy to understand.
...
"""


# Visualization Functions
def generate_artifact(user_input):
    logging.info("Getting LLM response for user input.")
    stream = False
    url = "https://proxy.tune.app/chat/completions"
    headers = {
        "Authorization": llm_api_key,
        "Content-Type": "application/json",
    }
    data = {
        "temperature": 0.8,
        "messages": [
            {"role": "system", "content": sys_prompt_artifacts},
            {"role": "user", "content": user_input},
        ],
        "model": "meta/llama-3.1-405b-instruct",
        "stream": stream,
        "frequency_penalty": 0,
        "max_tokens": 3000,
    }
    response = requests.post(url, headers=headers, json=data)
    logging.info("Received response from LLM.")

    if stream:
        for line in response.iter_lines():
            if line:
                l = line[6:]
                if l != b"[DONE]":
                    print(json.loads(l))
    else:
        return response.json()["choices"][0]["message"]["content"]


def parse_llm_output(llm_output):
    logging.info("Parsing LLM output for Python code blocks.")
    code_pattern = re.compile(r"```python(.*?)```", re.DOTALL)
    code_blocks = code_pattern.findall(llm_output)
    return code_blocks


def execute_visualization(code):
    buffer = io.StringIO()
    import sys

    sys.stdout = buffer

    try:
        exec(code, globals())

        if plt.get_fignums():
            buf = io.BytesIO()
            plt.savefig(buf, format="png")
            buf.seek(0)
            img_base64 = base64.b64encode(buf.getvalue()).decode("utf-8")
            plt.clf()
            return f'<img src="data:image/png;base64,{img_base64}"/>'

        elif "fig" in globals() and isinstance(globals()["fig"], go.Figure):
            html = globals()["fig"].to_html(full_html=False)
            return html

        else:
            return buffer.getvalue()

    except Exception as e:
        return f"An error occurred: {str(e)}"

    finally:
        sys.stdout = sys.__stdout__


@app.route("/generate", methods=["POST"])
def api_generate():
    user_input = request.json.get("input")
    if not user_input:
        return jsonify({"error": "No input provided."}), 400

    llm_output = generate_artifact(user_input)
    code_blocks = parse_llm_output(llm_output)

    if not code_blocks:
        return jsonify({"error": "No code blocks found in the LLM output."}), 400

    visualization_results = []
    for code in code_blocks:
        result = execute_visualization(code.strip())
        visualization_results.append(result)

    return jsonify({"visualizations": visualization_results})


# TTSTuneAI Functions
def get_llm_response(user_input):
    stream = False
    url = "https://proxy.tune.app/chat/completions"
    headers = {
        "Authorization": llm_api_key,
        "Content-Type": "application/json",
    }
    data = {
        "temperature": 0.8,
        "messages": [
            {"role": "system", "content": sys_prompt_tts},
            {"role": "user", "content": user_input},
        ],
        "model": "meta/llama-3.1-405b-instruct",
        "stream": stream,
        "frequency_penalty": 0,
        "max_tokens": 3000,
    }
    response = requests.post(url, headers=headers, json=data)
    return response.json()["choices"][0]["message"]["content"]


def text_to_speech_stream(input_text):
    url = "https://api.sarvam.ai/text-to-speech"
    payload = {
        "inputs": [input_text],
        "target_language_code": "hi-IN",
        "speaker": "meera",
        "pitch": 0,
        "pace": 1.20,
        "loudness": 1.5,
        "speech_sample_rate": 16000,
        "enable_preprocessing": True,
        "model": "bulbul:v1",
    }
    headers = {
        "Content-Type": "application/json",
        "API-Subscription-Key": "7fb37921-8bc5-4492-aea9-4d30186688d3",
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        response_data = json.loads(response.text)
        audio_base64 = response_data.get("audios", [])[0]

        if audio_base64:
            audio_data = base64.b64decode(audio_base64)
            return audio_data
        else:
            return None
    else:
        return None


def speech_to_text(audio_file):
    with open(audio_file, "rb") as file:
        transcription = client.audio.transcriptions.create(
            file=(audio_file, file.read()),
            model="whisper-large-v3",
            response_format="verbose_json",
        )
    return transcription.text


def record_audio(duration=6):
    CHUNK = 1024
    FORMAT = pyaudio.paInt16
    CHANNELS = 1
    RATE = 16000

    p = pyaudio.PyAudio()
    stream = p.open(
        format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK
    )

    frames = []

    print("Recording...")
    for _ in range(0, int(RATE / CHUNK * duration)):
        data = stream.read(CHUNK)
        frames.append(data)

    print("Recording finished.")
    stream.stop_stream()
    stream.close()
    p.terminate()

    filename = "audio.wav"
    with wave.open(filename, "wb") as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(pyaudio.PyAudio().get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(b"".join(frames))

    return filename


@app.route("/record", methods=["POST"])
def api_record():
    audio_file = record_audio(duration=6)  # Record for 6 seconds
    transcription = speech_to_text(audio_file)

    if transcription:
        llm_response = get_llm_response(transcription)
        audio_data = text_to_speech_stream(llm_response)
        return jsonify(
            {
                "transcription": transcription,
                "llm_response": llm_response,
                "audio_data": audio_data.decode(
                    "latin1"
                ),  # Encode audio data to string for JSON response
            }
        )
    else:
        return jsonify({"error": "No transcription available."}), 400


@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "running"})


if __name__ == "__main__":
    app.run(debug=True)
