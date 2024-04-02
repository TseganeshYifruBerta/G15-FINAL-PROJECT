import type { NextApiRequest, NextApiResponse } from 'next'
export type UploadFormData = {
    fullName?: string;
    userId?: string;
    email?: string;
    section?: string;
    role?: string;
    status?: string;
  };
  
  
  export const UploadManually = async (formData:UploadFormData) => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlkIjoxLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsInNlY3Rpb24iOltdLCJpYXQiOjE3MTEzOTY4Njh9.0LlDEKQCidCQEn_zoOnFo_89zON7QPmDhlNW7GWDtOw";

    try {
      const response = await fetch("http://localhost:5000/upload/inputUserDataUploader", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(formData),

      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message); // Throw an error with the error message from the backend
      }
  
      const data = await response.json();
      console.log("Success:", data);
      return data; // Return the data for further processing
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };