const jwt = require("jsonwebtoken");
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getQuestionDetalApi = createApi({
  reducerPath: "getQuestionDetalApi",
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
    getQuestionDetails: builder.query({
      query: (params) => {
        const { questionId } = params;
        let url =
          "https://g15-final-project-backend.onrender.com/question/getAllQuestionsById";
        const queryParams = [];
        const token = localStorage.getItem("token");
        const decodedToken = jwt.decode(token);
        const userId = decodedToken?.id || null;
        console.log(decodedToken, "uuuuuuu");
        queryParams.push(`${userId}`);
        queryParams.push(`${questionId}`);

        return {
          url: queryParams.length > 0 ? `${url}/${queryParams.join("/")}` : url,
          method: "GET",
        };
      },
    }),

    getQuestionDetailEdit: builder.query({
      query: (params) => {
        const { questionId } = params;
        let url =
          "https://g15-final-project-backend.onrender.com/question/DetailOfSelectedQuestion";
        const queryParams = [];
        queryParams.push(`${questionId}`);
        return {
          url: queryParams.length > 0 ? `${url}/${queryParams.join("/")}` : url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetQuestionDetailsQuery, useGetQuestionDetailEditQuery } = getQuestionDetalApi;
