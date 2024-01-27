import { configureStore } from "@reduxjs/toolkit";
import { reducer as formReducer } from 'redux-form';
import { useDispatch } from 'react-redux';
import signupTeacherReducer from './signup/signupSliceReducerTeacher';
import signupStudentReducer from './signup/SignupSliceReducerStudent';
import signinStudentReducer from "./signin/student-signin-slice"

import { getQuestionDetalApi } from "./question/get-questionById-api";
import  UploadState  from "@/store/upload/UploadSliceReducer";

export const store = configureStore({
  reducer: {
    upload: UploadState,
    form: formReducer,
    signupTeacherReducer,
    studentsignin:signinStudentReducer,
    // teachersignin: signinTeacherReducer,

    signupStudentReducer,
    [getQuestionDetalApi.reducerPath]: getQuestionDetalApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(getQuestionDetalApi.middleware)
  ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
