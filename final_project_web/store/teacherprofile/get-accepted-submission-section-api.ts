const jwt = require("jsonwebtoken");
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../host";

const baseUrl = `${URL}`;

export const acceptedApi = createApi({
  reducerPath: "acceptedApi",
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
    getAccepted: builder.query({
      query: (params) => {

        let url = `${URL}/codeSubmission/CountingAllAcceptedSubmittedQuestionsPerSection`;
        const queryParams = [];
        const token = localStorage.getItem("token");
        const decodedToken = jwt.decode(token);
        const userId = decodedToken?.id || null;
        queryParams.push(`${userId}`);

        return {
          url: queryParams.length > 0 ? `${url}/${queryParams.join("/")}` : url,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAcceptedQuery
} = acceptedApi;
