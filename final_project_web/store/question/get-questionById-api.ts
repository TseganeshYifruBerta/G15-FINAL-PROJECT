import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getQuestionDetalApi = createApi({
  reducerPath: "getQuestionDetalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as any).auth.token;
    //   if (token) {
    //     headers.set("authorization", `bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getQuestionDetails: builder.query({
      query: (params) => {
        const { userId, questionId } = params;
        let url = "/";

        const queryParams = [];
        queryParams.push(`userId=${userId}`);
        queryParams.push(`questionId=${questionId}`);

        return {
          url: queryParams.length > 0 ? `${url}?${queryParams.join("&")}` : url,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useGetQuestionDetailsQuery } = getQuestionDetalApi;
