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
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllDifficultyDataPerUserApi: builder.query<difficultyDataPerUser[], void>({
      query: () => {
        const token = localStorage.getItem("token");
        const decodedToken: { id: number } = jwt.decode(token) as { id: number };
        const userId = decodedToken.id;
        let url =
          "https://g15-final-project-backend.onrender.com/codeSubmission/getAllDifficultyDataPerUser";
        return {
          url: `${url}/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllDifficultyDataPerUserApiQuery } = getAllDifficultyDataPerUserApi;
