import { testCaseProps } from "@/components/questions/QuestionUpload";

export type ExamQuestionUploadFormData = {
  title: string;
  difficulty: string;
  description: string;
  example: string;
  testCases: testCaseProps[];
};

export const uploadexamquestion = async (formData: ExamQuestionUploadFormData) => {
  try {
    const response = await fetch("http://localhost:5000/sumbit/submitExam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
