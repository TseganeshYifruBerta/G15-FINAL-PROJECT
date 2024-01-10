// questionUploadApi.js
import Question from "@/type/question";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:5000/question";

export const questionUploadApi = createApi({
  reducerPath: "questionUploadApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    uploadQuestion: build.mutation({
      query: ({ title, description, difficulty, input, output }) => ({
        url: "/",
        method: "POST",
        body: { title, description, difficulty, input, output },
      }),
    }),
    addPost: build.mutation<Question, Partial<Question>>({
      query: (body) => ({
        url: `post`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useUploadQuestionMutation, useAddPostMutation } = questionUploadApi;
