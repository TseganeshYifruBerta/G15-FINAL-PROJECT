import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const jwt = require("jsonwebtoken");

const baseUrl = ""; 

export interface CountSubmission{
    date: string,
    count: number
}

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getCountCodeSubmissionsForLastMonthApi = createApi({
  reducerPath: "getCountCodeSubmissionsForLastMonthApi",
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
    getCountCodeSubmissionsForLastMonth: builder.query<CountSubmission[], void>({
      query: () => {
        const token = localStorage.getItem("token");
        const decodedToken: { id: number } = jwt.decode(token) as { id: number };
        const userId = decodedToken.id;
        const currentDate = getCurrentDate();
        let url =
          "https://g15-final-project-backend.onrender.com/codeSubmission/countCodeSubmissionsForLastMonth";
        return {
          url: `${url}/${currentDate}/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetCountCodeSubmissionsForLastMonthQuery } = getCountCodeSubmissionsForLastMonthApi;
