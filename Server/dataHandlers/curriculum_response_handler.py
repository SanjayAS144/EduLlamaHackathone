import os
import re
import json
from constants import CURRICULUMDATABASEDIR


class CurriculumDataHandler:
    def __init__(self):
        pass

    def saveResponse(self, curriculum_response, cource_name):
        print(curriculum_response)
        formated_response = self.formatResponse(curriculum_response)
        if not os.path.exists(CURRICULUMDATABASEDIR):
            os.mkdir(CURRICULUMDATABASEDIR)
        json_file = os.path.join(CURRICULUMDATABASEDIR, cource_name + ".json")
        self.WriteToJson(json_file, formated_response)
        data = {"CourcenName": cource_name, "CurriculumData": formated_response}
        return data

    def isCurriculumExists(self, cource_name):
        if not os.path.exists(CURRICULUMDATABASEDIR):
            return False
        json_file = os.path.join(CURRICULUMDATABASEDIR, cource_name + ".json")
        if not os.path.exists(json_file):
            return False
        return True

    def getCurriculumData(self, cource_name):
        if not os.path.exists(CURRICULUMDATABASEDIR):
            return None
        json_file = os.path.join(CURRICULUMDATABASEDIR, cource_name + ".json")
        if not os.path.exists(json_file):
            return None
        data = {
            "CourcenName": cource_name,
            "CurriculumData": self.ReadFromJson(json_file),
        }
        return data

    def getAllCurriculumData(self):
        if not os.path.exists(CURRICULUMDATABASEDIR):
            return {}
        curriculum_data = []
        for file in os.listdir(CURRICULUMDATABASEDIR):
            data = {
                "CourcenName": file.split(".")[0],
                "CurriculumData": self.ReadFromJson(
                    os.path.join(CURRICULUMDATABASEDIR, file)
                ),
            }
            curriculum_data.append(data)
        return curriculum_data

    def formatResponse(self, response):
        braceCount = 0
        output = ""
        for c in response:
            if c == "{":
                output += c
                braceCount += 1
            elif c == "}":
                output += c
                braceCount -= 1
            elif braceCount != 0:
                output += c
        try:
            cleaned_match = re.sub(r"\n\t", "", output)
            extracted_data = json.loads(cleaned_match)
            print(extracted_data)
            return extracted_data
        except json.JSONDecodeError as e:
            print(e)

        return {}

    def WriteToJson(self, fileName, data):
        try:
            with open(fileName, "w") as json_file:
                json.dump(data, json_file, indent=4)
        except Exception as e:
            print(e)

    def ReadFromJson(self, fileName):
        try:
            with open(fileName, "r") as json_file:
                data = json.load(json_file)
        except Exception as e:
            print(e)
        return data
