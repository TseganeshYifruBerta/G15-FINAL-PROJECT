import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:5000";
export interface studentRegisterProps{
    name: string;
    email: string;
    userId: string;
    section: string;
    password:string;
    confirmPassword:string;
}

// {
//   "name": "kjd",
//   "email":"t5691yifru@gmail.com",
//   "userId": "UGR/3970/12",
//   "section": "1",
//   "password": "1234567",
//   "confirmPassword": "1234567"
// }
interface studentRegProps{
  id: string,
  name: string,
  email: string,
  userId: string,
  password: string,
  confirmPassword: string,
  section: string,
  updatedAt: string,
  createdAt: string
}

export interface StudentRegState {
  message: studentRegisterProps;
  loading: boolean;
  success: boolean;
  error: Error | null;
}
export const registerStudent = createAsyncThunk<
  StudentRegState,
  studentRegisterProps
>("studentregister", async ({ name, email, userId, section, password, confirmPassword }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response: AxiosResponse<StudentRegState> = await axios.post(
      `${backendURL}/register/students`,
      { name, email, userId, section, password, confirmPassword },
      config
    );
    // Extract only the serializable parts of the response
    const serializableResponse: StudentRegState = {
      message: response.data.message,
      loading: response.data.loading,
      success: response.data.success,
      error: response.data.error,
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
});
