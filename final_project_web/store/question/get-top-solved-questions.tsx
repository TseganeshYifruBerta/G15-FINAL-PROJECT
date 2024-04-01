import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getTopSolvedQuestionsApi = createApi({
  reducerPath: "getTopSolvedQuestionsApi",
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
    getTopSolvedQuestions: builder.query({
      query: () => {
        let url =
          "http://localhost:5000/codeSubmission/fetchTopSolvedQuestions";

        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetTopSolvedQuestionsQuery } = getTopSolvedQuestionsApi;
