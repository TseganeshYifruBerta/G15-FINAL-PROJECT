export type PlagiarismExamId = {
  examId: string;
};

export const checkPlagiarismByExamId = async (formData: PlagiarismExamId) => {
     
     const token = localStorage.getItem("token");
      console.log("formdatakkkkkkkkkkkkkkkkkk",formData)
      
  try {
    const response = await fetch(
      "http://localhost:5000/plagiarism/checkPlagiarsm",
      {
        method: "POST",
        
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(formData),
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }


    const data = await response.json();
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Error:eeeeeeeeee", error);
    throw error; 
  }
};
