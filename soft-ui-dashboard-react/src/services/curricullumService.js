import { CourceData, CurriculumData } from "models/curriculumModel";

class CurriculumService {
  constructor() {
    this.CourceData = [];
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter(subscriber => subscriber !== callback);
  }

  notify() {
    this.subscribers.forEach(callback => callback(this.CourceData));
  }

  addCurriculum(data) {
    this.CourceData.push(data);
    this.notify(); // Notify subscribers
  }

  addCurriculum() {
    return this.CourceData;
  }

  async addCurriculum(subtopic, student_level, total_duration) {
    try {
      const body = {
        "subject": "Mathematics",
        "subtopic": subtopic,
        "student_level": student_level,
        "total_duration": total_duration
      }
      const response = await fetch('http://localhost:8000/api/v1/tune/Curriculum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }); // Replace with your API URL
      const data = await response.json();
      console.log(data);
      // this.addCurriculum(data)

      await this.getAllCurriculum()

      // Map the raw data to instances of User with nested Address
      // this.notify(); // Notify subscribers after fetching
    } catch (error) {
      console.error('error adding the data:', error);
    }
  }

  async getAllCurriculum() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/tune/Curriculum');
      const data = await response.json();
      console.log("Raw API response:", data);

      if (data.Response && Array.isArray(data.Response)) {
        this.CourceData = data.Response;
      } else {
        console.warn("API response structure is not as expected");
        this.CourceData = [];
      }

      console.log("Processed course data:", this.CourceData);
      this.notify();
      return this.CourceData;
    } catch (error) {
      console.error('Error fetching curriculum:', error);
      throw error;
    }
  }
}

// Create an instance of the service
const curriculumService = new CurriculumService();

// Export the instance as default
export default curriculumService;
