import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getQuestionDetalApi = createApi({
  reducerPath: "getQuestionDetalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getQuestionDetails: builder.query({
      query: (params) => {
        const { userId, questionId } = params;
        let url = "http://localhost:5000/question/getAllQuestionsById";
console.log(params)
        const queryParams = [];
        queryParams.push(`${userId}`);
        queryParams.push(`${questionId}`);
        return {
          url: queryParams.length > 0 ? `${url}/${queryParams.join("/")}` : url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetQuestionDetailsQuery } = getQuestionDetalApi;
