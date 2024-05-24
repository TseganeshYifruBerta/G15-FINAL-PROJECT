const jwt = require("jsonwebtoken");
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getAllExamsApi = createApi({
  reducerPath: "getAllExamsApi",
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
    getAllExams: builder.query({
      query: (params) => {
        let url =
          "https://g15-final-project-backend.onrender.com/exam/getAllExamQuestions";

        return {
          url: url,
          method: "GET",
        };
      },
    }),
    getAllExamList: builder.query({
      query: (params) => {
        let url =
          "https://g15-final-project-backend.onrender.com/exam/getAllCreatedExams";

        return {
          url: url,
          method: "GET",
        };
      },
    }),
    updateExamQuestion: builder.mutation({
      query: (question) => {
        const token = localStorage.getItem("token");
        const userId = jwt.decode(token).id;
        return {
          url: `https://g15-final-project-backend.onrender.com/exam/updateExamQuestionById/${userId}/${question.questionId}`, // Assuming the question object has an 'id' property
          method: "PUT",
          body: question,
        };
      },
    }),
    deleteExamQuestion: builder.mutation({
      query: (questionId) => {
        console.log(questionId, "questionId");
        const token = localStorage.getItem("token");
        const userId = jwt.decode(token).id;
        return {
          url: `https://g15-final-project-backend.onrender.com/exam/deleteExamQuestionById/${userId}/${questionId}`,
          method: "DELETE",
        };
      },
    }),

    updateExam: builder.mutation({
      query: (question) => {
        const token = localStorage.getItem("token");
        const userId = jwt.decode(token).id;
        const examId = question.examId
        return {
          url: `https://g15-final-project-backend.onrender.com/exam/updateExam/${userId}/${examId}`, // Assuming the question object has an 'id' property
          method: "PUT",
          body: question,
        };
      },
    }),

    deleteExam: builder.mutation({
      query: (questionId) => {
        console.log(questionId, "questionId");
        const token = localStorage.getItem("token");
        const userId = jwt.decode(token).id;
        return {
          url: `https://g15-final-project-backend.onrender.com/exam/deleteExam/${userId}/${questionId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const { useGetAllExamsQuery, useGetAllExamListQuery, useDeleteExamQuestionMutation, useUpdateExamQuestionMutation, useDeleteExamMutation, useUpdateExamMutation } = getAllExamsApi;
