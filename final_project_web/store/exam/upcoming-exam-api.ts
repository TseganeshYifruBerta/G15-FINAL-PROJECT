import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVR1IvODg4OC84OCIsImlkIjoyLCJlbWFpbCI6ImVrcnVpd2MyMDIwQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50Iiwic2VjdGlvbiI6WyIxIl0sImlhdCI6MTcxMzA5MzkzMX0.4MFypnmWhYkNY_HVW9lR8O_5xKcSYa7z4rQI7xduZRU";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUpcomingExams: builder.query<UpcomingExam, void>({
      query: () => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVR1IvODg4OC84OCIsImlkIjoyLCJlbWFpbCI6ImVrcnVpd2MyMDIwQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50Iiwic2VjdGlvbiI6WyIxIl0sImlhdCI6MTcxMzA5MzkzMX0.4MFypnmWhYkNY_HVW9lR8O_5xKcSYa7z4rQI7xduZRU";
        const decodedToken: { id: number } = jwt.decode(token) as { id: number };
        const userId = decodedToken.id;
        const url = "http://localhost:5000/exam/upcomingExam";

        return {
          url: `${url}/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetUpcomingExamsQuery } = upcomingExamsApi;
