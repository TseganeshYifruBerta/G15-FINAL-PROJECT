const jwt = require("jsonwebtoken");

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../host";

// Assuming the access token is stored in localStorage for this example.
// You might be storing it differently, adjust accordingly.
const baseUrl = ""; // Ensure this is set to your API's base URL if it's not the same as your app's URL

export const getAllStudentsApi = createApi({
  reducerPath: "getAllStudentsApi",
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
    getAllStudents: builder.query({
      query: () => {
        const token = localStorage.getItem("token");
        const decodedToken = jwt.decode(token);
        let url = `${URL}/upload/fetchAllStudentBasedOnSection/${decodedToken.id}`;
        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllStudentsQuery } = getAllStudentsApi;
