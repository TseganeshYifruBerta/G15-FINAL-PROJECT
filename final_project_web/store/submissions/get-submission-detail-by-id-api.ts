import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getSubmissionDetailByIdApi = createApi({
  reducerPath: "getSubmissionDetailByIdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getSubmissionDetail: builder.query({
      query: (params) => {
        const { submitId } = params;
        let url =
          "http://localhost:5000/question/fetchQuestionDetailBySubmittedId";
        console.log(params);
        const queryParams = [];
        queryParams.push(`${submitId}`);
        return {
          url: queryParams.length > 0 ? `${url}/${queryParams.join("/")}` : url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetSubmissionDetailQuery } = getSubmissionDetailByIdApi;
