import { configureStore } from "@reduxjs/toolkit";
import { reducer as formReducer } from 'redux-form';
import { useDispatch } from 'react-redux';
import signupTeacherReducer from './signup/signupSliceReducerTeacher';
import signupStudentReducer from './signup/SignupSliceReducerStudent';
import signinStudentReducer from "./signin/student-signin-slice"

import { getQuestionDetalApi } from "./question/get-questionById-api";
import  UploadStateStudent  from "@/store/upload/UploadSliceReducerStudent";
import  UploadStateTeacher  from "@/store/upload/UploadTeacherSliceReducer";

export const store = configureStore({
  reducer: {
    upload: UploadStateStudent,UploadStateTeacher,
    form: formReducer,
    register: signupTeacherReducer,
    signupStudentReducer,
   
    studentsignin:signinStudentReducer,
    // teachersignin: signinTeacherReducer,
    [getQuestionDetalApi.reducerPath]: getQuestionDetalApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(getQuestionDetalApi.middleware)
  ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
