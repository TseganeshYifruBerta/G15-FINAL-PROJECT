import { testCaseProps } from "@/components/questions/QuestionUpload";

export type ExamAnswerUploadFormData = {
  examId: string;
  userId: string;
  questionId: string;
  submittedAnswer: string;
};

export const uploadexamanswer = async (formData: ExamAnswerUploadFormData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      "http://localhost:5000/exam/uploadExamQuestion",
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
