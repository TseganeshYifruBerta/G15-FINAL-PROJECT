import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../host";

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
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getSubmissionDetail: builder.query<SubmissionDetailProps, { submitId: string }>({
      query: ({submitId}) => {
        const token = localStorage.getItem("token");
        const decodedToken: { id: number } = jwt.decode(token) as { id: number };
        const userId = decodedToken.id;
        let url = `${URL}/codeSubmission/fetchQuestionDetailBySubmittedId`;
        return {
          url: `${url}/${userId}/${submitId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetSubmissionDetailQuery } = getSubmissionDetailByIdApi;
