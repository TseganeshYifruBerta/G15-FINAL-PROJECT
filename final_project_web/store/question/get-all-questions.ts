const jwt = require("jsonwebtoken");
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:5000/question/";

export const questionApi = createApi({
  reducerPath: "questionApi",
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
    // const token = localStorage.getItem("token");
    // const userId = jwt.decode(token).id;
    getAllQuestions: builder.query({
      query: () => `${baseUrl}/getAllQuestions`,
    }),
    updateQuestion: builder.mutation({
      query: (question) => {
        const token = localStorage.getItem("token");
        const userId = jwt.decode(token).id;
        return {
          url: `${baseUrl}/updateQuestionById/${question.id}/${userId}`, // Assuming the question object has an 'id' property
          method: "PUT",
          body: question,
        };
      },
    }),
    deleteQuestion: builder.mutation({
      query: (questionId) => {
        const token = localStorage.getItem("token");
        const userId = jwt.decode(token).id;
        return {
          url: `${baseUrl}/deleteQuestionById/${questionId}/${userId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllQuestionsQuery,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionApi;
