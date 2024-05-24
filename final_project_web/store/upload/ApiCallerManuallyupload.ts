import type { NextApiRequest, NextApiResponse } from 'next'
export type UploadFormData = {
    fullName?: string;
    userId?: string;
    email?: string;
    section?: string[];
    role?: string;
    status?: string;
  };
  
  
  export const UploadManually = async (formData:UploadFormData) => {
     const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://g15-final-project-backend.onrender.com/upload/inputUserDataUploader",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(formData),
        }
      );
  
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