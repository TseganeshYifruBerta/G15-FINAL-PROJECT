import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getExamDetailByIdApi = createApi({
  reducerPath: "getExamDetailByIdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getExamDetailById: builder.query({
      query: (params) => {
        const { examId } = params;
        let url = "http://localhost:5000/exam/getCreateExamById";
        console.log(params);
        const queryParams = [];
        queryParams.push(`${examId}`);
        return {
          url: queryParams.length > 0 ? `${url}/${queryParams.join("/")}` : url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetExamDetailByIdQuery } = getExamDetailByIdApi;
