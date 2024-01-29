import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getAllSubmissionsByIdApi = createApi({
  reducerPath: "getAllSubmissionsByIdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllSubmissionsById: builder.query({
      query: (params) => {
        const { userId } = params;
        let url = "http://localhost:5000/question/fetchSubmittedQuestionById";
        console.log(params);
        return {
          url: url + `/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllSubmissionsByIdQuery } = getAllSubmissionsByIdApi;
