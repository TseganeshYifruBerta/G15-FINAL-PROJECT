import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getAllExamQuestionsApi = createApi({
  reducerPath: "getAllExamQuestions",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllExamQuestions: builder.query({
      query: (params) => {
        let url = "http://localhost:5000/exam/getAllExamQuestions";

        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllExamQuestionsQuery } = getAllExamQuestionsApi;
