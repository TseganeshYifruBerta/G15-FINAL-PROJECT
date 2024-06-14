<<<<<<< HEAD
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../host";

const jwt = require("jsonwebtoken");

const baseUrl = ""; 

export interface difficultyDataPerUser{
    easyQuestionCount: number,
    mediumQuestionCount: number,
    hardQuestionCount: number
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
    getAllDifficultyDataPerUserApi: builder.query({
      query: () => {
        const token = localStorage.getItem("token");
        let url = `${URL}/question/getNumberOfQuestionByDifficulty`;
        return {
          url: `${url}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllDifficultyDataPerUserApiQuery } = getAllDifficultyDataPerUserApi;
=======
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../host";

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
        let url = `${URL}/codeSubmission/getAllDifficultyDataPerUser`;
        return {
          url: `${url}/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllDifficultyDataPerUserApiQuery } = getAllDifficultyDataPerUserApi;
>>>>>>> 96fa67b (admin_landing_profile_pages_update)
