import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const jwt = require("jsonwebtoken");

const baseUrl = ""; 

export interface difficultyDataPerUser{
    id: number,
    easyCount: number,
    mediumCount: number,
    hardCount: number,
    totalCount: number,
    userId: string,
    createdAt: string,
    updatedAt: string
}


export const getAllDifficultyDataPerUserApi = createApi({
  reducerPath: "getAllDifficultyDataPerUserApi",
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
    getAllDifficultyDataPerUserApi: builder.query<difficultyDataPerUser[], void>({
      query: () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVR1IvODg4OC84OCIsImlkIjoyLCJlbWFpbCI6ImVrcnVpd2MyMDIwQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50Iiwic2VjdGlvbiI6WyIxIl0sImlhdCI6MTcxMzAzNjcxNH0.u9Gf2iCqJ837oHGuAL-nLOzPpnQmOLJetsoYYjtjS5Y";
        const decodedToken: { id: number } = jwt.decode(token) as { id: number };
        const userId = decodedToken.id;
        let url = "http://localhost:5000/codeSubmission/countCodeSubmissionsForLastYear";
        return {
          url: `${url}/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllDifficultyDataPerUserApiQuery } = getAllDifficultyDataPerUserApi;
