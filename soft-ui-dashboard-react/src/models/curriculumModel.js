// ValueModel.js
class CourceData {
    constructor(CourcenName, CurriculumData) {
      this.CourcenName = CourcenName; // Assuming `id` is unique for each value
      this.CurriculumData = CurriculumData; // The name associated with the value
    }
  
    // You can add methods to manipulate the data if needed
    display() {
      return `${this.name} (${this.email})`;
    }
  }

class CurriculumData{
    constructor(topics, dailyItinerary){
        this.topics = topics
        this.dailyItinerary = dailyItinerary;
    }
    display(){
        return `${this.name} (${this.description})`;
    }
}

class Message{
  constructor(role, content){
      this.role = role
      this.content = content;
  }
  display(){
      return `${this.role} (${this.content})`;
  }
}
  
export { CourceData, CurriculumData,Message };