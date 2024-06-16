import { testCaseProps } from "@/components/questions/QuestionUpload";
import { URL } from "../host";

export type ExamQuestionUploadFormData = {
  title: string;
  difficulty: string;
  description: string;
  example: string;
  testcases: testCaseProps[];
  solutions: any[];
  tag: string;
  chapter: string;
  plagiarismRatio: string;
  gradeValue: string;
};

export const uploadexamquestion = async (formData: ExamQuestionUploadFormData) => {
     const token = localStorage.getItem("token");
console.log(formData, "formDataaaaaaaaaaaaa")
  try {
    const response = await fetch(`${URL}/exam/uploadExamQuestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
