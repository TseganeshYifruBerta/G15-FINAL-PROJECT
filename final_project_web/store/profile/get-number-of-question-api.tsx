import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../host";

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
        let url = `${URL}/question/getNumberOfAllQuestion`;

        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetNumberOfAllQuestionQuery } = getNumberOfAllQuestionApi;
