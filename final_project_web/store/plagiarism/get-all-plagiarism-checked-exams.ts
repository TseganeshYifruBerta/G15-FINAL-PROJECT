import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const jwt = require("jsonwebtoken");
import { URL } from "../host";

const baseUrl = "";

export const getAllPlagiarismCheckedExamsApi = createApi({
  reducerPath: "getAllPlagiarismCheckedExamsApi",
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
    getAllPlagiarismCheckedExams: builder.query({
      query: () => {
      
        let url = `${URL}/plagiarism/fetchAllPlagiarismCheckedExams`;
        // const queryParams = [];

        // const token = localStorage.getItem("token");
        // const decodedToken = jwt.decode(token);
        // const teacherId = decodedToken?.id || null;

        // queryParams.push(`${teacherId}`);

        return {
          url:url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllPlagiarismCheckedExamsQuery } = getAllPlagiarismCheckedExamsApi;
