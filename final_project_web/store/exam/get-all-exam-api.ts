import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getAllExamsApi = createApi({
  reducerPath: "getAllExamsApi",
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
    getAllExams: builder.query({
      query: (params) => {
        let url = "http://localhost:5000/exam/getAllExamQuestions";

        return {
          url: url,
          method: "GET",
        };
      },
    }),
    getAllExamList: builder.query({
      query: (params) => {
        let url = "http://localhost:5000/exam/getAllCreatedExams";

        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllExamsQuery, useGetAllExamListQuery } = getAllExamsApi;
