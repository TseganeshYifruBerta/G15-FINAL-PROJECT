import { testCaseProps } from "@/components/questions/QuestionUpload";

export type ExamUploadFormData = {
  title: string;
  date_and_time: string;
  instruction: string;
  duration: string;
  sections: string[];
  questions: string[];
};

export const uploadexam = async (formData: ExamUploadFormData) => {
  try {
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
