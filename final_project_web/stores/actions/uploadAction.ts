import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:5000";
export interface testCasesProps {
  input: {
    score: string
  };
  output: string;
}
interface QuestionArgs {
  title: string;
  difficulty: string;
  description: string;
  example: string;
  testCases: testCasesProps[];
}
export interface QuestionProps {
  id: number;
  title: string;
  difficulty: string;
  description: string;
  example: string;
  updatedAt: string;
  createdAt: string;
}
export interface QuestionState {
  message: string;
  question: QuestionProps;
  testCases: testCasesProps[];
  loading: boolean;
  success: boolean;
  error: Error | null;
}
export const registerQuestion = createAsyncThunk<QuestionState, QuestionArgs>(
  "questionupload",
  async ({ title, difficulty, description, example, testCases }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response: AxiosResponse<QuestionState> = await axios.post(
        `${backendURL}/question`,
        { title, difficulty, description, example, testCases },
        config
      );
      // Extract only the serializable parts of the response
      const serializableResponse: QuestionState = {
        message: response.data.message,
        question: response.data.question,
        testCases: response.data.testCases,
        loading: response.data.loading,
        success: response.data.success,
        error: response.data.error,
      };
      console.log(serializableResponse);
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
