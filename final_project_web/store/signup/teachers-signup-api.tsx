import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000";

export const teachersSignUpApi = createApi({
  reducerPath: "teachersSignUpApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getTeachersSignUpApi: builder.query({
      query: ({ email, password }) => ({
        url: "/",
        method: "POST",
        body: { email, password }, // Add the email and password to the request body
      }),
    }),
  }),
});

export const { useGetTeachersSignUpApiQuery } = teachersSignUpApi;
