// questionUploadApi.js
import Question from "@/type/question";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const questionUploadApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/question",
  }),
  endpoints: (build) => ({
    uploadQuestion: build.mutation<Question, Partial<Question>>({
      query: (questionDetails) => ({
        url: "/",
        method: "POST",
        body: questionDetails,
      }),
    }),
  }),
});

export const { useUploadQuestionMutation } = questionUploadApi;
