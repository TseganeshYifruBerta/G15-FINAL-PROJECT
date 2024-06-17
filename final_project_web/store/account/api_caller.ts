// services/apiCaller.ts
const jwt = require("jsonwebtoken");
import type { NextApiRequest, NextApiResponse } from 'next'
import {URL} from '../host';

export interface UserProfile { 
    university: string;
    linkedin: string;
    github: string;
    phoneNumber: string;
    gender: string;
    department: string;
    shortBio: string;
}

export interface UserProfile2 { 
    userId: number,
    fullName: string,
    role: string,
    university: string;
    linkedin: string;
    github: string;
    phoneNumber: string;
    gender: string;
    department: string;
    shortBio: string;
    photoUrl: string;
}

interface profileApiResponse {
    user: UserProfile[];
}

export async function createUserProfile(token: string | null, profileData: UserProfile, id: number) {
    try {
        console.log("createUserProfilebdfijsbibsib", JSON.stringify(profileData));
        const response = await fetch(
            `${URL}/upload/updateUserProfile/${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(profileData),
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
}

export async function fetchUserProfile(token: string | null, id: number): Promise<UserProfile2> {
  console.log("Fetching user profile", token);
  console.log("Fetching user profile", id);
  try {
      const response = await fetch(`${URL}/upload/getUserProfile/${id}`, {
          method: 'GET',
          headers: {
              Authorization: token ? `Bearer ${token}` : '',
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
      }

      const data: { profile: UserProfile2 } = await response.json();
      return data.profile;
  } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
  }
}



export async function updateUserProfilePhoto(token: string, id: number, imageUrl: string): Promise<void> {
  try {
    const response = await fetch(`${URL}/upload/updateUserProfilePhoto/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ photoUrl: imageUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    console.log('Profile photo updated successfully');
  } catch (error) {
    console.error('Error updating profile photo:', error);
    throw error;
  }
}