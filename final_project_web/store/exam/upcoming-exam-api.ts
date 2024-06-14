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
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUpcomingExams: builder.query<UpcomingExam, void>({
      query: () => {

        const token = localStorage.getItem("token");
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
