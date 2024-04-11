import { testCaseProps } from "@/components/questions/QuestionUpload";

export type AddExamTestcaseFormData = {
  testCases: any[];
  questionId: string;
};

export const addexamtestcase = async (formData: AddExamTestcaseFormData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      "http://localhost:5000/question/AddTestcases",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Include the Authorization header with the bearer token if it exists
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    const data = await response.json();
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
