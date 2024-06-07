const jwt = require("jsonwebtoken");
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../host";

const baseUrl = "";

export const getWeeklyReportApi = createApi({
  reducerPath: "getWeeklyReportApi",
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
    getWeeklyReport: builder.query({
      query: () => {
        const token = localStorage.getItem("token");
        const decodedToken = jwt.decode(token);
        const today = new Date().toISOString().split("T")[0];

        let url = `${URL}/codeSubmission/countCodeSubmissionsForLastWeek/${today}/${decodedToken.id}`;

        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetWeeklyReportQuery } = getWeeklyReportApi;
