import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getStudentProfileByIdApi = createApi({
  reducerPath: "getStudentProfileByIdApi",
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
    getStudentProfileById: builder.query({
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

export const { useGetStudentProfileByIdQuery } = getStudentProfileByIdApi;
