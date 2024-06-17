const jwt = require("jsonwebtoken");
import { URL } from "../host";

export type CriteriaUploadState = {
  examId: string;
  examQuestionId: string;
  timeComplexity: number;
  codeQuality: number;
  codeComment: number;
  codeCorrectness: number;
  teacherId: string;
  gradeValue: number;
};

export const uploadcriteria = async (formData: CriteriaUploadState) => {
    console.log(formData, "formDataaaaaaaaaaaaa")
  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token);
  const userId = decodedToken?.id || null;
  formData.teacherId = userId;

  try {
    const response = await fetch(`${URL}/grading/addCriteria`, {
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
    console.error("Error:eeeeeeeee", error);
    throw error;
  }
};
