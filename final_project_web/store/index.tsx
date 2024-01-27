import { configureStore } from "@reduxjs/toolkit";
import { reducer as formReducer } from 'redux-form';
import { useDispatch } from 'react-redux';
import signupTeacherReducer from './signup/signupSliceReducerTeacher';
import signupStudentReducer from './signup/SignupSliceReducerStudent';
import signinStudentReducer from "./signin/student-signin-slice"
import questionUploadReducer from "./question-upload/question-upload-slice"
import { getQuestionDetalApi } from "./question/get-questionById-api";

export const store = configureStore({
  reducer: {
    form: formReducer,
    signupTeacherReducer,
    studentsignin:signinStudentReducer,
    // teachersignin: signinTeacherReducer,
questionupload:questionUploadReducer,
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
