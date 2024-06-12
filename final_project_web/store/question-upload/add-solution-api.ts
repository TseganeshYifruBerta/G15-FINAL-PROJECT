import { testCaseProps } from "@/components/questions/QuestionUpload";
import { URL } from "../host";

export type AddExamSolutionFormData = {
  content: any[];
  examQuestionId: string;
};

export const addexamsolution = async (formData: AddExamSolutionFormData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${URL}/exam/addSolution`, {
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
