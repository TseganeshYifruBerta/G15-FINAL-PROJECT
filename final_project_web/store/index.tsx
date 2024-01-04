import { configureStore } from "@reduxjs/toolkit";
import { teachersSignInApi } from "./signin/teachers-signin-api";
import { studentsSignInApi } from "./signin/students-signin-api";
import { studentsSignUpApi } from "./signup/students-signup-api";
import { teachersSignUpApi } from "./signup/teachers-signup-api";
import {questionUploadApi} from "./questionupload/question-upload-api";

export const store = configureStore({
  reducer: {
    [teachersSignInApi.reducerPath]: teachersSignInApi.reducer,
    [studentsSignInApi.reducerPath]: studentsSignInApi.reducer,
    [teachersSignUpApi.reducerPath]: teachersSignUpApi.reducer,
    [studentsSignUpApi.reducerPath]: studentsSignUpApi.reducer,
    [questionUploadApi.reducerPath]: questionUploadApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(teachersSignInApi.middleware)
      .concat(studentsSignInApi.middleware)
      .concat(teachersSignUpApi.middleware)
      .concat(studentsSignUpApi.middleware)
      .concat(questionUploadApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
