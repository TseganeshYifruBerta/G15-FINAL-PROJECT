import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const jwt = require("jsonwebtoken");
import { URL } from "../host";

const baseUrl = "";

export const fetchAllPlagiarizedSectionApi = createApi({
  reducerPath: "fetchAllPlagiarizedSectionApi",
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
    fetchAllPlagiarizedSection: builder.query({
      query: (params) => {
        const {  examId , studentId , questionId} = params;
        let url = `${URL}/plagiarism/fetchAllPlagiarizedSections`;
        const queryParams = [];

        queryParams.push(`${examId}`);
        queryParams.push(`${studentId}`);
        queryParams.push(`${questionId}`);


        return {
          url: queryParams.length > 0 ? `${url}/${queryParams.join("/")}` : url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useFetchAllPlagiarizedSectionQuery } = fetchAllPlagiarizedSectionApi;
