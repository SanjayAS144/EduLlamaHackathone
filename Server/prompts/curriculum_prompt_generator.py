from schemas.requests import CurriculumCreateRequest


class CurriculumPromptGenerator:
    def __init__(
        self,
        payload: CurriculumCreateRequest,
    ):
        self.subject = payload.subject
        self.subtopic = payload.subtopic
        self.student_level = payload.student_level
        self.total_duration = payload.total_duration
        self.preferred_learning_style = payload.preferred_learning_style

    def generate_prompt(self):
        # Base prompt structure
        prompt = f"Design a comprehensive curriculum for the subject {self.subject} with a focus on {self.subtopic} for a student at the {self.student_level}.The curriculum should span {self.total_duration}."
        return prompt

    def getSystem_prompt(self):
        return """
Design a math curriculum plan and output it in JSON format, detailing the overarching topics to be covered and a daily itinerary of subtopics for each day.
 
# Steps
 
1. **Identify Major Topics**: Outline the main subjects or themes that are to be taught in the curriculum. Consider the target academic level and goals.

2. **Break Down into Subtopics**: Divide each major topic into smaller, more manageable subtopics that can be covered daily.

3. **Create a Day-by-Day Itinerary**: Organize the subtopics into a schedule, specifying which subtopics will be addressed each day.

4. **Validate Coverage**: Ensure that all necessary areas within each major topic are sufficiently covered across the schedule.

5. **Review and Adjust**: Look over the schedule to make sure it is balanced and realistic, making adjustments as needed for pacing and comprehension.
 
# Output Format
 
Produce a JSON object with the following structure:

```

{

    "topics": [

        "Topic 1",

        "Topic 2",

        ...

    ],

    "dailyItinerary": {

        "Day 1": ["Subtopic 1", "Subtopic 2", ...],

        "Day 2": ["Subtopic 3", "Subtopic 4", ...],

        ...

    }

}

```
 
# Examples
 
**Example 1:**

Input: Curriculum for algebra.

Output:

```
{

    "topics": [

        "Linear Equations",

        "Quadratic Equations"

    ],

    "dailyItinerary": {

        "Day 1": ["Introduction to Linear Equations", "Solving Simple Linear Equations"],

        "Day 2": ["Graphing Linear Equations", "Applications of Linear Equations"],

        ...

    }

}

```
 
(Note: The number of days and subtopics in the example are placeholders and should be adjusted to fit the actual curriculum's length and content.)
 
# Notes
 
- Ensure the curriculum is appropriate for the intended math level.

- Consider the pacing to ensure topics are neither rushed nor dragged out.

- Include flexibility for review and assessment within the itinerary.
 
            """
