import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000";

export const teachersSignInApi = createApi({
  reducerPath: "signInApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getTeachersSignInStatus: builder.query({
      query: ({ email, password }) => ({
        url: "/",
        method: "POST",
        body: { email, password }, // Add the email and password to the request body
      }),
    }),
  }),
});

export const { useGetTeachersSignInStatusQuery } = teachersSignInApi;
