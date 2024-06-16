import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const jwt = require("jsonwebtoken");
import { URL } from "../host";

const baseUrl = "";

export const fetchQuestionsFromGradedExamApi = createApi({
  reducerPath: "fetchQuestionsFromGradedExamApi",
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
    fetchQuestionsFromGradedExam: builder.query({
      query: (params) => {
        const {  examId, studentId} = params;

        let url = `${URL}/plagiarism/fetchListOfQuestionsByExamId`;
        const queryParams = [];

        queryParams.push(`${examId}`);
        queryParams.push(`${studentId}`);

        return {
          url: queryParams.length > 0 ? `${url}/${queryParams.join("/")}` : url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useFetchQuestionsFromGradedExamQuery } = fetchQuestionsFromGradedExamApi;
