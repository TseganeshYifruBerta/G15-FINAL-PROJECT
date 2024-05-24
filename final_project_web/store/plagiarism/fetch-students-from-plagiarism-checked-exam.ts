import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const jwt = require("jsonwebtoken");
const baseUrl = "";

export const fetchStudentsFromPlagiarismCheckedExamApi = createApi({
  reducerPath: "fetchStudentsFromPlagiarismCheckedExamApi",
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
    fetchStudentsFromPlagiarismCheckedExam: builder.query({
      query: (params) => {
        const {  examId } = params;
        let url =
          "https://g15-final-project-backend.onrender.com/plagiarism/fetchStudentsFromPlagiarismCheckedExam";
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

export const { useFetchStudentsFromPlagiarismCheckedExamQuery } = fetchStudentsFromPlagiarismCheckedExamApi;
