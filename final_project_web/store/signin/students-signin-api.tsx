import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000";

export const studentsSignInApi = createApi({
  reducerPath: "studentsSignInApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getStudentsSignInStatus: builder.query({
      query: ({ email, password }) => ({
        url: "/http://localhost:5500/login/students",
        method: "POST",
        body: { email, password }, // Add the email and password to the request body
      }),
    }),
  }),
});

export const { useGetStudentsSignInStatusQuery } = studentsSignInApi;
