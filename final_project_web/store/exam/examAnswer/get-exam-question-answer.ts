import { URL } from "../../host";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const jwt = require("jsonwebtoken");
const baseUrl = "";

export const getExamQuestionAnswerApi = createApi({
  reducerPath: "getExamQuestionAnswerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExamQuestionAnswer: builder.query({
      query: (params) => {
        const { userId, questionId } = params;
        let url = `${URL}/exam/getSubmissionOfstudentByQuestionId`;
        const queryParams = [];

        queryParams.push(`${userId}`);
        queryParams.push(`${questionId}`);

        return {
          url: queryParams.length > 0 ? `${url}/${queryParams.join("/")}` : url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetExamQuestionAnswerQuery } = getExamQuestionAnswerApi;
