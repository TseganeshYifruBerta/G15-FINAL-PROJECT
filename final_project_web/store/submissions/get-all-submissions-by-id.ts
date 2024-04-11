import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
      // Retrieve your access token from wherever it's stored
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVR1IvODg4OC84OCIsImlkIjo5LCJlbWFpbCI6ImVrcnVpd2MyMDIwQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50Iiwic2VjdGlvbiI6WyIxIl0sImlhdCI6MTcxMjg1NzQ3Nn0.bX77E6A6vicd_2M713DKF6wYAJwasG8LiDFBgXVUaZI";
      // If we have a token, set the authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllSubmissionsById: builder.query<Submission[], void>({
      query: () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVR1IvODg4OC84OCIsImlkIjo5LCJlbWFpbCI6ImVrcnVpd2MyMDIwQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50Iiwic2VjdGlvbiI6WyIxIl0sImlhdCI6MTcxMjg1NzQ3Nn0.bX77E6A6vicd_2M713DKF6wYAJwasG8LiDFBgXVUaZI";
        const decodedToken: { id: number } = jwt.decode(token) as { id: number };
        const userId = decodedToken.id;
        let url = "http://localhost:5000/codeSubmission/fetchingAllAcceptedSubmittedQuestionsPerUser";
        return {
          url: `${url}/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllSubmissionsByIdQuery } = getAllSubmissionsByIdApi;
