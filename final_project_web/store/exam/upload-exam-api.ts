const jwt = require("jsonwebtoken");
export type ExamUploadFormData = {
    
    teacherId:string,
    title:string,
    date_and_time:string,
    instruction:string,
    duration:string,
    sections:any[],
    tag : string,
    chapter :any[],
    easy_questions : string,
    medium_questions : string,
    hard_questions : string
    

};

export const uploadexam = async (formData: ExamUploadFormData) => {
         const token = localStorage.getItem("token");
const decodedToken = jwt.decode(token);
const userId = decodedToken?.id || null;
formData.teacherId = userId;
  try {
    const response = await fetch(
      "https://g15-final-project-backend.onrender.com/exam/createExam",
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
    const data = await response.json();
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Error:eeeeeeeee", error);
    throw error;
  }
};
