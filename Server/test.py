import re
import logging
import io
import matplotlib.pyplot as plt
import numpy as np
from plotly import graph_objects as go
import requests
from plotly.io import write_image


def generate_visualization(user_input):
    logging.info("Starting visualization generation process.")

    # LLM API configuration
    url = "https://proxy.tune.app/chat/completions"
    headers = {
        "Authorization": "sk-tune-tWdlAZ7UylGzyEt7SNxFMly8eJVBHRJHgkj",
        "Content-Type": "application/json",
    }

    # System prompt for visualization generation
    sys_prompt_artifacts = """
    The assistant can create and reference interactive Python visualizations during conversations to educate students visually and make learning more fun and engaging. These visualizations should explain mathematical and scientific concepts in an interactive and visually appealing manner.
   
    [Rest of the system prompt as provided in the original code]
    """

    # Generate artifact using LLM
    data = {
        "temperature": 0.8,
        "messages": [
            {"role": "system", "content": sys_prompt_artifacts},
            {"role": "user", "content": user_input},
        ],
        "model": "meta/llama-3.1-405b-instruct",
        "stream": False,
        "frequency_penalty": 0,
        "max_tokens": 3000,
    }
    response = requests.post(url, headers=headers, json=data)
    llm_output = response.json()["choices"][0]["message"]["content"]

    # Parse LLM output for Python code blocks
    code_pattern = re.compile(r"```python(.*?)```", re.DOTALL)
    code_blocks = code_pattern.findall(llm_output)

    if not code_blocks:
        return "No visualization code was generated."

    # Execute the first code block (assuming one visualization per request)
    code = code_blocks[0].strip()

    try:
        # Execute the code
        exec(code, globals())

        # Check if a Matplotlib figure was created
        if plt.get_fignums():
            plt.savefig("image.png")
            plt.clf()
            return "Visualization saved as image.png"

        # Check if a Plotly figure was created
        elif "fig" in globals() and isinstance(globals()["fig"], go.Figure):
            write_image(globals()["fig"], "image.png")
            return "Visualization saved as image.png"

        else:
            return "No visualization was created."

    except Exception as e:
        return f"An error occurred: {str(e)}"


# Example usage
result = generate_visualization("Create a visualization to explain integrals")
# print(result)  # This will print a message indicating success or failure
