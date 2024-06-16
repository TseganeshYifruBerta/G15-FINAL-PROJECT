import { URL } from "../host";
const jwt = require("jsonwebtoken");

export type GradingData = {
  teacherId: any;
  examId: string;
};

export const gradingExams = async (formData: GradingData) => {
  const tokens = localStorage.getItem("token");
        const decodedToken = jwt.decode(tokens);
        const teacherId = decodedToken?.id || null;

  const token = localStorage.getItem("token");
  try {
    formData.teacherId = teacherId;
    const response = await fetch(`${URL}/grading/gradeResult`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Error:eeeeeeeeee", error);
    throw error;
  }
};
