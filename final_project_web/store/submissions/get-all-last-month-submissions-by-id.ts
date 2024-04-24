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
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVR1IvODg4OC84OCIsImlkIjoyLCJlbWFpbCI6ImVrcnVpd2MyMDIwQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50Iiwic2VjdGlvbiI6WyIxIl0sImlhdCI6MTcxMzAzNjcxNH0.u9Gf2iCqJ837oHGuAL-nLOzPpnQmOLJetsoYYjtjS5Y"; // Assuming you have a redux state slice named 'auth' containing the token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCountCodeSubmissionsForLastMonth: builder.query<CountSubmission[], void>({
      query: () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVR1IvODg4OC84OCIsImlkIjoyLCJlbWFpbCI6ImVrcnVpd2MyMDIwQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50Iiwic2VjdGlvbiI6WyIxIl0sImlhdCI6MTcxMzAzNjcxNH0.u9Gf2iCqJ837oHGuAL-nLOzPpnQmOLJetsoYYjtjS5Y";
        const decodedToken: { id: number } = jwt.decode(token) as { id: number };
        const userId = decodedToken.id;
        const currentDate = getCurrentDate();
        let url = "http://localhost:5000/codeSubmission/countCodeSubmissionsForLastYear";
        return {
          url: `${url}/${currentDate}/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetCountCodeSubmissionsForLastMonthQuery } = getCountCodeSubmissionsForLastMonthApi;
