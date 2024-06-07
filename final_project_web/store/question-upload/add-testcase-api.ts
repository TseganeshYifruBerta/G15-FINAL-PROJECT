import { testCaseProps } from "@/components/questions/QuestionUpload";
import { URL } from "../host";

export type AddTestcaseFormData = {
  testCases:any[]
  questionId: string;
};

export const addtestcase = async (formData: AddTestcaseFormData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${URL}/question/AddTestcases`, {
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
