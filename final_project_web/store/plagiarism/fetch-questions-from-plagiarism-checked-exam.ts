import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const jwt = require("jsonwebtoken");
const baseUrl = "";

export const fetchQuestionsFromPlagiarismCheckedExamApi = createApi({
  reducerPath: "fetchQuestionsFromPlagiarismCheckedExamApi",
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
    fetchQuestionsFromPlagiarismCheckedExam: builder.query({
      query: (params) => {
        const {  examId } = params;
        let url = "http://localhost:5000/plagiarism/fetchListOfQuestionsByExamId";
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

export const { useFetchQuestionsFromPlagiarismCheckedExamQuery } = fetchQuestionsFromPlagiarismCheckedExamApi;
