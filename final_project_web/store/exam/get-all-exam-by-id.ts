import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../host";

const baseUrl = "";

export const getExamQuestionByIdApi = createApi({
  reducerPath: "getExamQuestionByIdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Retrieve your access token from wherever it's stored
      const token = localStorage.getItem("token");
      // If we have a token, set the authorization header
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExamQuestionById: builder.query({
      query: (params) => {
        const { questionId } = params;
        let url = `${URL}/exam/examQuestionDetailById`;
        const queryParams = [];
        queryParams.push(`${questionId}`);
        return {
          url: queryParams.length > 0 ? `${url}/${queryParams.join("/")}` : url,
          method: "GET",
        };
      },
    }),
    getExamById: builder.query({
      query: (params) => {
        const { examId } = params;
        let url = `${URL}/exam/getExamByIdWithQuestions`;
        const queryParams = [];
        queryParams.push(`${examId}`);
        return {
          url: queryParams.length > 0 ? `${url}/${queryParams.join("/")}` : url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetExamQuestionByIdQuery, useGetExamByIdQuery } =
  getExamQuestionByIdApi;
