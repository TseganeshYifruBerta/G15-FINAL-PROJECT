<<<<<<< HEAD
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../host";

  const baseUrl = "";
  const jwt = require("jsonwebtoken");

  export interface TestCase {
    id: number;
    output: string[];
    input: string;
  }

  export interface Question {
    id: number;
    title: string;
    difficulty: string;
    description: string;
    example: string;
    teacherId: string;
    functionName: string;
    createdAt: string;
    updatedAt: string;
    TestCases: TestCase[];
  }

  export interface QuestionStatus {
    id: number;
    status: string;
    questionId: string;
    userCode: string;
    createdAt: string;
    updatedAt: string;
    UserinformationId: number;
    submittedCodeId: number;
  }

  export interface Submission {
    id: number;
    questionsForId: Question;
    questionStatus: QuestionStatus | null;
  }




export const getAllSubmissionsByIdApi = createApi({
  reducerPath: "getAllSubmissionsByIdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllSubmissionsById: builder.query<Submission[], void>({
      query: () => {
        const token = localStorage.getItem("token");
        const decodedToken: { id: number } = jwt.decode(token) as { id: number };
        const userId = decodedToken.id;
        let url =
          `${URL}/codeSubmission/fetchingAllSubmittedQuestionsPerUser`;
        return {
          url: `${url}/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllSubmissionsByIdQuery } = getAllSubmissionsByIdApi;
=======
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../host";

  const baseUrl = "";
  const jwt = require("jsonwebtoken");

  export interface TestCase {
    id: number;
    output: string[];
    input: string;
  }

  export interface Question {
    id: number;
    title: string;
    difficulty: string;
    description: string;
    example: string;
    teacherId: string;
    functionName: string;
    createdAt: string;
    updatedAt: string;
    TestCases: TestCase[];
  }

  export interface QuestionStatus {
    id: number;
    status: string;
    questionId: string;
    userCode: string;
    createdAt: string;
    updatedAt: string;
    UserinformationId: number;
    submittedCodeId: number;
  }

  export interface Submission {
    id: number;
    questionsForId: Question;
    questionStatus: QuestionStatus | null;
  }




export const getAllSubmissionsByIdApi = createApi({
  reducerPath: "getAllSubmissionsByIdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllSubmissionsById: builder.query<Submission[], void>({
      query: () => {
        const token = localStorage.getItem("token");
        const decodedToken: { id: number } = jwt.decode(token) as { id: number };
        const userId = decodedToken.id;
        let url =
          `${URL}/codeSubmission/fetchingAllAcceptedSubmittedQuestionsPerUser`;
        return {
          url: `${url}/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllSubmissionsByIdQuery } = getAllSubmissionsByIdApi;
>>>>>>> 96fa67b (admin_landing_profile_pages_update)
