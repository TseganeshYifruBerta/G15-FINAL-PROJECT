const jwt = require("jsonwebtoken");
import { testCaseProps } from "@/components/questions/QuestionUpload";

import { URL } from "../host";

export type ExamAnswerUploadFormData = {
  examId: string;
  userId: string;
  questionId: string;
  solution: string;
};

export const uploadexamanswer = async (formData: ExamAnswerUploadFormData) => {
  const token = localStorage.getItem("token");
const decoded = jwt.decode(token);
const userId = decoded ? (decoded as any).id : "";
formData.userId = userId;
console.log(formData, "form data");

  try {
    const response = await fetch(`${URL}/exam/submitExamAnswerByStudent`, {
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
