const jwt = require("jsonwebtoken");
import { URL } from "../host";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "";

export const getPassKeyApi = createApi({
  reducerPath: "getPassKeyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Retrieve your access token from wherever it's stored
      const token = localStorage.getItem("token");
      // If we have a token, set the authorization header
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPassKey: builder.query({
      query: (params) => {
        const examId = params.examId;
        const passKey = params.passKey;
        const token = localStorage.getItem("token");
        const userId = jwt.decode(token).id;
        let url = `${URL}/exam/getExamDetailByIdStudentView/${examId}/${userId}/${passKey}`;

        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetPassKeyQuery } = getPassKeyApi;
