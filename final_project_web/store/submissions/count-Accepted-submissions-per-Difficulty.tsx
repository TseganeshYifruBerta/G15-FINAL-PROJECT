<<<<<<< HEAD
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../host";

const jwt = require("jsonwebtoken");


const baseUrl = ""; 

export interface difficultyData{
    easyCount: number,
    mediumCount: number,
    hardCount: number,
}


export const countAcceptedSubmissionsperDifficultyApi = createApi({
  reducerPath: "countAcceptedSubmissionsperDifficultyApi",
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
    countAcceptedSubmissionsperDifficultyApi: builder.query({
      query: () => {
        const token = localStorage.getItem("token");
        const decodedToken: { id: number } = jwt.decode(token) as { id: number };
        const userId = decodedToken.id;
        let url = `${URL}/codeSubmission/countAcceptedSubmissionperDifficulty`;
        return {
          url: `${url}/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCountAcceptedSubmissionsperDifficultyApiQuery } = countAcceptedSubmissionsperDifficultyApi;
=======
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../host";

const jwt = require("jsonwebtoken");


const baseUrl = ""; 

export interface difficultyData{
    easyCount: number,
    mediumCount: number,
    hardCount: number,
}


export const countAcceptedSubmissionsperDifficultyApi = createApi({
  reducerPath: "countAcceptedSubmissionsperDifficultyApi",
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
    countAcceptedSubmissionsperDifficultyApi: builder.query<difficultyData[], void>({
      query: () => {
        const token = localStorage.getItem("token");
        const decodedToken: { id: number } = jwt.decode(token) as { id: number };
        const userId = decodedToken.id;
        let url = `${URL}/codeSubmission/countAcceptedSubmissionsPerUser`;
        return {
          url: `${url}/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCountAcceptedSubmissionsperDifficultyApiQuery } = countAcceptedSubmissionsperDifficultyApi;
>>>>>>> 96fa67b (admin_landing_profile_pages_update)
