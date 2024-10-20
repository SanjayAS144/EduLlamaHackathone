import os
import json
from constants import TUTORDATADIR


class CourceHandler:
    def __init__(self):
        self.cources = []
        self.cource = None

    def isExistingCource(self, dayNumber, topic):
        dir = os.path.join(TUTORDATADIR, topic)
        if not os.path.exists(dir):
            return False
        file = os.path.join(dir, dayNumber + ".json")
        if not os.path.exists(file):
            return False
        return True

    def getHistory(self, dayNumber, topic):
        if not self.isExistingCource(dayNumber, topic):
            return []
        file = os.path.join(TUTORDATADIR, topic, dayNumber + ".json")
        with open(file, "r") as json_file:
            data = json.load(json_file)
        return data

    def saveHistory(self, dayNumber, topic, content):
        dir = os.path.join(TUTORDATADIR, topic)
        if not os.path.exists(dir):
            os.makedirs(dir)
        os.delete(os.path.join(dir, dayNumber + ".json"))
        file = os.path.join(dir, dayNumber + ".json")
        with open(file, "w") as json_file:
            json.dump(content, json_file)

    def constructBaseMessage(self, dayNumber, topic):
        return f"start the tutorial with Introduction to {topic} for day {dayNumber}"

    def getSystemPrompt(self):
        return """
            You are a highly skilled interactive math tutor designed to adapt your teaching style based on the student’s skill level. Your primary goal is to teach math concepts in a way that is simple, engaging, and easy to understand. Use examples and real-world analogies to make abstract concepts clearer, and ensure the student stays motivated throughout the learning process.
 
Your behavior should be friendly, supportive, and patient, encouraging the student to ask questions and interact with the material. Make sure to assess the student's current knowledge by asking relevant questions at the beginning and adjust your explanations accordingly. Break down difficult concepts into smaller, more manageable steps, and reinforce learning through practice problems.
 
When responding:
- Provide clear, concise explanations with examples.
- Adjust the difficulty level based on the student's responses and skill level.
- Keep the student engaged by asking questions, offering challenges, and giving feedback on their progress.
- Celebrate small wins to boost confidence.
- Avoid overwhelming the student with too much information at once.
- Encourage curiosity and deeper understanding through interactive dialogues.
        """
