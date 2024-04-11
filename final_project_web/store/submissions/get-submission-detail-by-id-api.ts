import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  const baseUrl = "";
  const jwt = require("jsonwebtoken");

  export interface SubmissionDetailProps {
    questionStatus: {
      id: number;
      status: string;
      questionId: string;
      userCode: string;
      createdAt: string;
      updatedAt: string;
      UserinformationId: number;
      submittedCodeId: number;
    };
    questionSubmitted: {
      id: number;
      title: string;
      difficulty: string;
      description: string;
      example: string;
      teacherId: string;
      functionName: string;
      createdAt: string;
      updatedAt: string;
    };
  }


export const getSubmissionDetailByIdApi = createApi({
  reducerPath: "getSubmissionDetailByIdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVR1IvODg4OC84OCIsImlkIjo5LCJlbWFpbCI6ImVrcnVpd2MyMDIwQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50Iiwic2VjdGlvbiI6WyIxIl0sImlhdCI6MTcxMjg1NzQ3Nn0.bX77E6A6vicd_2M713DKF6wYAJwasG8LiDFBgXVUaZI";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getSubmissionDetail: builder.query<SubmissionDetailProps, { submitId: string }>({
      query: ({submitId}) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVR1IvODg4OC84OCIsImlkIjo5LCJlbWFpbCI6ImVrcnVpd2MyMDIwQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50Iiwic2VjdGlvbiI6WyIxIl0sImlhdCI6MTcxMjg1NzQ3Nn0.bX77E6A6vicd_2M713DKF6wYAJwasG8LiDFBgXVUaZI";
        const decodedToken: { id: number } = jwt.decode(token) as { id: number };
        const userId = decodedToken.id;
        let url = "http://localhost:5000/codeSubmission/fetchQuestionDetailBySubmittedId";
        return {
          url: `${url}/${userId}/${submitId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetSubmissionDetailQuery } = getSubmissionDetailByIdApi;
