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
