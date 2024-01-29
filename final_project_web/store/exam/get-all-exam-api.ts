import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getAllExamsApi = createApi({
  reducerPath: "getAllExamsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllExams: builder.query({
      query: (params) => {
        let url = "http://localhost:5000/exam/getAllExamQuestions";

        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllExamsQuery } = getAllExamsApi;
