import { testCaseProps } from "@/components/questions/QuestionUpload";
import { URL } from "../host";

export type QuestionUploadFormData = {
  title: string;
  difficulty: string;
  description: string;
  example: string;
  testCases: testCaseProps[];
};



export const uploadquestion = async (formData: QuestionUploadFormData) => {
   const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${URL}/question/submitQuestion`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Include the Authorization header with the bearer token if it exists
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
