import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = ""; // Ensure this is set to your API's base URL if it's not the same as your app's URL

export const getTopStudentsApi = createApi({
  reducerPath: "getTopStudentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Retrieve your access token from wherever it's stored
      const token = localStorage.getItem("token");

      // If we have a token, set the authorization header
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopStudents: builder.query({
      query: () => {
        let url = `http://localhost:5000/codeSubmission/getTopStudents`;
        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetTopStudentsQuery } = getTopStudentsApi;
