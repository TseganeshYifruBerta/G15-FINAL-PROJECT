// questionUploadApi.js
import Question from "@/type/question";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000";

export const questionUploadApi = createApi({
  reducerPath: "questionUploadApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    uploadQuestion: builder.query({
      query: (questionDetails: Question) => ({
        url: "/uploadquestion",
        method: "POST",
        body: questionDetails,
      }),
    }),
  }),
});

export const { useUploadQuestionQuery } = questionUploadApi;
