import { CourceData, CurriculumData,Message } from "models/curriculumModel";

class MessageService {
  constructor() {
    this.messages = [];
  }


  async chat(topic,subtopic, dayNumber, userMessages) {
    try {
      const body = {
        "topic": topic,
        "subtopic": subtopic,
        "dayNumber": dayNumber,
        "userMessages": userMessages
      }
      
      const response = await fetch('http://localhost:8000/api/v1/tune/converse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }); // Replace with your API URL
      const data = await response.json();
      console.log(data);
      return data
      // this.addCurriculum(data)
      // Map the raw data to instances of User with nested Address
      // this.notify(); // Notify subscribers after fetching
    } catch (error) {
      console.error('error adding the data:', error);
    }
  }

  async chat2(topic,subtopic, dayNumber, userMessages) {
    try {
      const body = {
        "topic": topic,
        "subtopic": subtopic,
        "dayNumber": dayNumber,
        "userMessage": userMessage
      }
      
      const response = await fetch('http://localhost:8000/api/v1/tune/chatThread', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }); // Replace with your API URL
      const data = await response.json();
      console.log(data);
      return data
      // this.addCurriculum(data)
      // Map the raw data to instances of User with nested Address
      // this.notify(); // Notify subscribers after fetching
    } catch (error) {
      console.error('error adding the data:', error);
    }
  }

  async getALLMessages(day,topic) {
    try {
        let noSpaces = day.replace(/\s+/g, '');
        let encodedUri = `http://localhost:8000/api/v1/tune/converse/${topic}/${noSpaces}`;
        let decodedUri = decodeURIComponent(encodedUri);
        console.log(decodedUri)
      const response = await fetch(decodedUri);
      const data = await response.json();
      console.log("Raw API response:", data);

      if (data.Response && Array.isArray(data.Response)) {
        this.messages = data
      } else {
        console.warn("API response structure is not as expected");
        this.CourceData = [];
      }

      return this.messages;
    } catch (error) {
      console.error('Error fetching curriculum:', error);
      throw error;
    }
  }
}

// Create an instance of the service
const messageService = new MessageService();

// Export the instance as default
export default messageService;
