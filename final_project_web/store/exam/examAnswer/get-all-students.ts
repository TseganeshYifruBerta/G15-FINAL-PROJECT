import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL } from "../../host";

const jwt = require("jsonwebtoken");
const baseUrl = "";

export const getAllExamTakenStudentsApi = createApi({
  reducerPath: "getAllExamTakenStudentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllExamTakenStudents: builder.query({
      query: (params) => {
        const {  examId } = params;
        let url = `${URL}/exam/getAllExamtakeStudent`;
        const queryParams = [];
        const token = localStorage.getItem("token");
        const decodedToken = jwt.decode(token);
        const teacherId = decodedToken?.id || null;
        queryParams.push(`${teacherId}`);
        queryParams.push(`${examId}`);

        return {
          url: queryParams.length > 0 ? `${url}/${queryParams.join("/")}` : url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllExamTakenStudentsQuery } = getAllExamTakenStudentsApi;
