class ArtifactData {
    constructor() {
        this.type= ""
        this.title= ""
        this.language= ""
        this.content = ""
    }
  
    // You can add methods to manipulate the data if needed
    display() {
      return `${this.name} (${this.email})`;
    }
  }

  const artifactData = new ArtifactData();
  export default artifactData;