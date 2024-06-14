import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../host";

const baseUrl = "";

export const getAcceptedQuestionByIdApi = createApi({
  reducerPath: "getAcceptedQuestionByIdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAcceptedQuestionById: builder.query({
      query: (params) => {
        const { userId } = params;
        let url = `${URL}/question/countAcceptedSubmissionsForUser`;
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

export const { useGetAcceptedQuestionByIdQuery } = getAcceptedQuestionByIdApi;
