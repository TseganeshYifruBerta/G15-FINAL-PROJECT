import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getNumberOfAllQuestionApi = createApi({
  reducerPath: "getNumberOfAllQuestionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getNumberOfAllQuestion: builder.query({
      query: (params) => {
        let url = "http://localhost:5000/question/getNumberOfAllQuestion";
        
        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetNumberOfAllQuestionQuery } = getNumberOfAllQuestionApi;
