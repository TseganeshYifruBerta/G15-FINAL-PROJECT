// services/apiCaller.ts
const jwt = require("jsonwebtoken");
import type { NextApiRequest, NextApiResponse } from 'next'
interface UserProfile { 
    university: string;
    linkedin: string;
    github: string;
    phoneNumber: string;
    telegramUsername: string;
    gender: string;
    department: string;
    shortBio: string;
    photoUrl: string;
  }
  
  export async function createUserProfile(token: string | null, profileData: UserProfile, id: number) {
    
    try {
      console.log("createUserProfilebdfijsbibsib", JSON.stringify(profileData));
    const response = await fetch(`http://localhost:5000/userProfile/CreateUserProfile/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
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