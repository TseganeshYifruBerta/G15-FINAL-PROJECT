import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getAllQuestionApi = createApi({
  reducerPath: "getAllQuestionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllQuestions: builder.query({
      query: () => {
        let url = "http://localhost:5000/question/getAllQuestions";

        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllQuestionsQuery } = getAllQuestionApi;
