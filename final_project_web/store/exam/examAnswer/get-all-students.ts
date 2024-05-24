// const jwt = require("jsonwebtoken"); // Add this line to import jwt

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl = ""; 

// export const getAllExamTakenStudentsApi = createApi({
//   reducerPath: "getAllExamTakenStudentsApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: baseUrl,
//     prepareHeaders: (headers, { getState }) => {
     
//       const token = localStorage.getItem("token");

//       if (token) {
//         headers.set("authorization", `Bearer ${token}`);
//       }

//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     getAllExamTakenStudents: builder.query({
//       query: () => {
//         const token = localStorage.getItem("token");
//         const decodedToken = jwt.decode(token);
//         let url = `http://localhost:5000/upload/fetchAllStudentBasedOnSection/${decodedToken.id}`;
//         return {
//           url: url,
//           method: "GET",
//         };
//       },
//     }),
//   }),
// });

// export const { useGetAllExamTakenStudentsQuery } = getAllExamTakenStudentsApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
        let url =
          "https://g15-final-project-backend.onrender.com/exam/getAllExamtakeStudent";
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
