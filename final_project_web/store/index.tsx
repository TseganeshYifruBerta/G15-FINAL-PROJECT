import { configureStore } from "@reduxjs/toolkit";
import { teachersSignInApi } from "./signin/teachers-signin-api";
import { reducer as formReducer } from 'redux-form';
import { useDispatch } from 'react-redux';
import { studentsSignInApi } from "./signin/students-signin-api";
import signupTeacherReducer from './signup/signupSliceReducerTeacher';
import signupStudentReducer from './signup/SignupSliceReducerStudent';


export const store = configureStore({
  reducer: {
    form: formReducer,
    register: signupTeacherReducer,
    signupStudentReducer,
    [teachersSignInApi.reducerPath]: teachersSignInApi.reducer,
    [studentsSignInApi.reducerPath]: studentsSignInApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(teachersSignInApi.middleware)
      .concat(studentsSignInApi.middleware)
     ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
