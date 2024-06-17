const jwt = require("jsonwebtoken");
import { URL } from "../host";

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
        let url = `${URL}/exam/getAllExamQuestions`;

        return {
          url: url,
          method: "GET",
        };
      },
    }),
    getAllExamList: builder.query({
      query: (params) => {
        let url = `${URL}/exam/getAllCreatedExams`;

        return {
          url: url,
          method: "GET",
        };
      },
    }),
    getAllExamListStudent: builder.query({
      query: (params) => {
        const token = localStorage.getItem("token");
        const userId = jwt.decode(token).id;
        console.log(userId, "userId")
        let url = `${URL}/exam/getAllExamsByStudentId/${userId}`;

        return {
          url: url,
          method: "GET",
        };
      },
    }),
    getExamResultByStudentId: builder.query({
      query: (params) => {
        const examId = params.examId
        const token = localStorage.getItem("token");
        const userId = jwt.decode(token).id;
        let url = `${URL}/grading/fetchGradeResultByStudentId/${examId}/${userId}`;

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
          url: `${URL}/exam/updateExamQuestionById/${userId}/${question.questionId}`, // Assuming the question object has an 'id' property
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
          url: `${URL}/exam/deleteExamQuestionById/${userId}/${questionId}`,
          method: "DELETE",
        };
      },
    }),

    updateExam: builder.mutation({
      query: (question) => {
        const token = localStorage.getItem("token");
        const userId = jwt.decode(token).id;
        const examId = question.examId;
        return {
          url: `${URL}/exam/updateExam/${userId}/${examId}`, // Assuming the question object has an 'id' property
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
          url: `${URL}/exam/deleteExam/${userId}/${questionId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllExamsQuery,
  useGetAllExamListQuery,
  useDeleteExamQuestionMutation,
  useUpdateExamQuestionMutation,
  useDeleteExamMutation,
  useUpdateExamMutation,
  useGetAllExamListStudentQuery,
  useGetExamResultByStudentIdQuery
} = getAllExamsApi;
