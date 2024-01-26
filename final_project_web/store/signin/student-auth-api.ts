import Login from "@/types/auth/student-signin";
// import { getCookie } from "@/utils/cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  reducerPath: "auth/api",
  tagTypes: ["Student"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),

  endpoints(builder) {
    return {
      loginStudent: builder.mutation({
        query: (body: Login) => {
          return { url: "/login/students", method: "POST", body };
        },
      }),
    };
  },
});

export const {
  useLoginStudentMutation,
} = authApiSlice;
