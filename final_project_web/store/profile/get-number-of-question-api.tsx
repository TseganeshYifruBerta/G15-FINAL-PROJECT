import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getNumberOfAllQuestionApi = createApi({
  reducerPath: "getNumberOfAllQuestionApi",
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
    getNumberOfAllQuestion: builder.query({
      query: (params) => {
        let url =
          "https://g15-final-project-backend.onrender.com/question/getNumberOfAllQuestion";

        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetNumberOfAllQuestionQuery } = getNumberOfAllQuestionApi;
