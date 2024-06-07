import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../host";

const baseUrl = "";

export const getTeacherProfileByIdApi = createApi({
  reducerPath: "getTeacherProfileByIdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getTeacherProfileById: builder.query({
      query: (params) => {
        const { userId } = params;
        let url = `${URL}/question/getAllQuestionsById`;
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

export const { useGetTeacherProfileByIdQuery } = getTeacherProfileByIdApi;
