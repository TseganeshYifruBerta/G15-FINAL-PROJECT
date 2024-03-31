const jwt = require("jsonwebtoken");

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Assuming the access token is stored in localStorage for this example.
// You might be storing it differently, adjust accordingly.
const baseUrl = ""; // Ensure this is set to your API's base URL if it's not the same as your app's URL

export const getAllTeachersApi = createApi({
  reducerPath: "getAllTeacherApi",
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
    getAllTeachers: builder.query({
      query: () => {
        const token = localStorage.getItem("token");
        const decodedToken = jwt.decode(token);
        let url = `http://localhost:5000/upload/fetchAllStudents${decodedToken.userId}`;
        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllTeachersQuery } = getAllTeachersApi;
