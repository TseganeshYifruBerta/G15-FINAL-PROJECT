import { testCaseProps } from "@/components/questions/QuestionUpload";

export type ExamQuestionUploadFormData = {
  title: string;
  difficulty: string;
  description: string;
  example: string;
  testcases: testCaseProps[];
  solution: string;
};

export const uploadexamquestion = async (
  formData: ExamQuestionUploadFormData
) => {
  try {
    {
      console.log("Form data submitted afterrrrr:::::::;;;:", formData);
    }
    const response = await fetch("http://localhost:5000/exam/submitExam", {
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
    console.error("Error:eeeeeeeee", error);
    throw error;
  }
};
