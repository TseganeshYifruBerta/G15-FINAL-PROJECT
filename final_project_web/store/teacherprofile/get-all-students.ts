import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getAllStudentsApi = createApi({
  reducerPath: "getAllStudentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (params) => {
        let url = "http://localhost:5000/upload/getAllStudents";

        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllStudentsQuery } = getAllStudentsApi;
