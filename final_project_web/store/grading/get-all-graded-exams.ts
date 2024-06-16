import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const jwt = require("jsonwebtoken");
import { URL } from "../host";

const baseUrl = "";

export const getAllGradedExamsApi = createApi({
  reducerPath: "getAllGradedExamsApi",
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
    getAllGradedExams: builder.query({
      query: () => {
      
        let url = `${URL}/grading/fetchAllGradedExams`;
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

export const { useGetAllGradedExamsQuery } = getAllGradedExamsApi;
