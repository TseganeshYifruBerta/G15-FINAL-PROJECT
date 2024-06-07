import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../host";

const baseUrl = "";
const jwt = require("jsonwebtoken");

export interface UpcomingExam {
  id: number;
  title: string;
  date_and_time: string;
}

export const upcomingExamsApi = createApi({
  reducerPath: "upcomingExamsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVR1IvMTExMS8xMSIsImlkIjo3LCJlbWFpbCI6ImVrdWl3YzIwMjFAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJzZWN0aW9uIjpbIjIiXSwiaWF0IjoxNzE1NjU4NjMxfQ.T6iG5QEAZP-nsZ8coqTGtF0uiNeogO-mkP50Qy0nz4k";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUpcomingExams: builder.query<UpcomingExam, void>({
      query: () => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVR1IvMTExMS8xMSIsImlkIjo3LCJlbWFpbCI6ImVrdWl3YzIwMjFAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJzZWN0aW9uIjpbIjIiXSwiaWF0IjoxNzE1NjU4NjMxfQ.T6iG5QEAZP-nsZ8coqTGtF0uiNeogO-mkP50Qy0nz4k";
        const decodedToken: { id: number } = jwt.decode(token) as { id: number };
        const userId = decodedToken.id;
        const url = `${URL}/exam/upcomingExam`;

        return {
          url: `${url}/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetUpcomingExamsQuery } = upcomingExamsApi;
