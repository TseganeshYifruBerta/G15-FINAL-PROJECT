import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getAllQuestionByStudentIdApi = createApi({
  reducerPath: "getAllQuestionByStudentIdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllQuestionByStudentId: builder.query({
      query: (params) => {
        const { studentId } = params;
        let url = "http://localhost:5000/exam/getAllQuestionByStudentId";
        const queryParams = [];
        queryParams.push(`${studentId}`);
        return {
          url: queryParams.length > 0 ? `${url}/${queryParams.join("/")}` : url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllQuestionByStudentIdQuery } = getAllQuestionByStudentIdApi;
