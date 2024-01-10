import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:5000";

interface RegisterState {
    message: string
}


interface StudentRegProps {
  name: string;
  email: string;
  userId: string;
  password: string;
  confirmPassword: string;
  section: string
}
export const registerStudent = createAsyncThunk<RegisterState, StudentRegProps>(
  "question",
  async ({ name, email, userId, password, confirmPassword, section }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response: AxiosResponse<RegisterState> = await axios.post(
        `${backendURL}/register/students`,
        { name, email, userId, password, confirmPassword, section },
        config
      );
      // Extract only the serializable parts of the response
      const serializableResponse: RegisterState = {
        message: response.data.message,
      };
      return serializableResponse;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        console.log(error.response.data);
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);
