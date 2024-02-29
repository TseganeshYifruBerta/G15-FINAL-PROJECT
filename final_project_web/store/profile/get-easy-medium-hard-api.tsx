import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getEasyMediumHardByIdApi = createApi({
  reducerPath: "getEasyMediumHardByIdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getEasyMediumHardById: builder.query({
      query: (params) => {
        const { userId } = params;
        let url =
          "http://localhost:5000/execution/getSubmittedDifficulty";
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

export const { useGetEasyMediumHardByIdQuery } = getEasyMediumHardByIdApi;
