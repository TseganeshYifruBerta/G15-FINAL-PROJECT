import type { NextApiRequest, NextApiResponse } from 'next'
export type RegisterFormData = {
    name: string;
    userId: string;
    email: string;
    section: string;
    password: string;
    confirmPassword: string;
  };
  
  export const register = async (formData: RegisterFormData) => {
    try {
      const response = await fetch("/register/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", 
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