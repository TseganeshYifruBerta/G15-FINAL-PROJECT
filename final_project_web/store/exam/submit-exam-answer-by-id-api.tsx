import { testCaseProps } from "@/components/questions/QuestionUpload";

export type ExamAnswerUploadFormData = {
  examId: string;
  userId: string;
  questionId: string;
  solution: string;
};

export const uploadexamanswer = async (formData: ExamAnswerUploadFormData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      "https://g15-final-project-backend.onrender.com/exam/submitExamAnswerByStudent",
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
    console.error("Error:", error);
    throw error;
  }
};
