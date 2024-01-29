import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getExamQuestionByIdApi = createApi({
  reducerPath: "getExamQuestionByIdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getExamQuestionById: builder.query({
      query: (params) => {
        const { userId } = params;
        let url = "http://localhost:5000/upload/findStudentByID";
        console.log(params);
        const queryParams = [];
        queryParams.push(`${userId}`);
        return {
          url: queryParams.length > 0 ? `${url}/${queryParams.join("/")}` : url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetExamQuestionByIdQuery } = getExamQuestionByIdApi;
