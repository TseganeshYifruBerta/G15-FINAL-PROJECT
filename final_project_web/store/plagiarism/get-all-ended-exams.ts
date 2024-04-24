import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const jwt = require("jsonwebtoken");
const baseUrl = "";

export const getAllEndedExamsApi = createApi({
  reducerPath: "getAllEndedExamsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllEndedExams: builder.query({
      query: () => {
      
        let url = "http://localhost:5000/plagiarism/fetchAllEndedExams";
        const queryParams = [];

        const token = localStorage.getItem("token");
        const decodedToken = jwt.decode(token);
        const teacherId = decodedToken?.id || null;

        queryParams.push(`${teacherId}`);

        return {
          url: queryParams.length > 0 ? `${url}/${queryParams.join("/")}` : url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllEndedExamsQuery } = getAllEndedExamsApi;
