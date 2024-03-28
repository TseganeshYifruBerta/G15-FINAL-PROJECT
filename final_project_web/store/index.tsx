import { configureStore } from "@reduxjs/toolkit";
import { reducer as formReducer } from 'redux-form';
import { useDispatch } from 'react-redux';
import signupTeacherReducer from './signup/signupSliceReducerTeacher';
import signupStudentReducer from './signup/SignupSliceReducerStudent';
import  UploadStateStudent  from "@/store/upload/UploadSliceReducerStudent";
import  UploadStateTeacher  from "@/store/upload/UploadTeacherSliceReducer";
import signinStudentReducer from "./signin/student-signin-slice"
import questionUploadReducer from "./question-upload/question-upload-slice"
import examQuestionUploadReducer from './exam/upload-exam-question-slice'
import loginReducer from './login/login-slice'
import { getAllQuestionApi } from "./question/get-all-questions";
// import { getAllSubmissionsByIdApi } from "./submissions/get-all-submissions-by-id";
import { getSubmissionDetailByIdApi } from "./submissions/get-submission-detail-by-id-api";
import { getQuestionDetalApi } from "./question/get-questionById-api";
import { getAllSubmissionsByIdApi } from "./submissions/get-all-submissions-by-id";
import { getAcceptedQuestionByIdApi } from "./profile/get-accepted-wrong-question-by-student-id";
import { getStudentProfileByIdApi } from "./profile/get-student-profile-detail-api";
import { getTeacherProfileByIdApi } from "./profile/get-teacher-profile-detail-api";
import { getEasyMediumHardByIdApi } from "./profile/get-easy-medium-hard-api";
import { getNumberOfAllQuestionApi } from "./profile/get-number-of-question-api";
import { getAllExamsApi } from "./exam/get-all-exam-api";
import { getExamQuestionByIdApi } from "./exam/get-all-exam-by-id";
import { getAllStudentsApi } from "./teacherprofile/get-all-students";
import {getTopSolvedQuestionsApi} from "./question/get-top-solved-questions"
import { getWeeklyReportApi } from "./profile/get-weekly-report";
export const store = configureStore({
  reducer: {
    form: formReducer,
    register: signupTeacherReducer,
    signupStudentReducer,
    upload: UploadStateStudent,
    UploadStateTeacher,
    studentsignin: signinStudentReducer,
    questionupload: questionUploadReducer,
    examquestionupload: examQuestionUploadReducer,
    login: loginReducer,
    [getQuestionDetalApi.reducerPath]: getQuestionDetalApi.reducer,
    [getAllQuestionApi.reducerPath]: getAllQuestionApi.reducer,
    [getSubmissionDetailByIdApi.reducerPath]:
      getSubmissionDetailByIdApi.reducer,
    [getAllSubmissionsByIdApi.reducerPath]: getAllSubmissionsByIdApi.reducer,
    [getStudentProfileByIdApi.reducerPath]: getStudentProfileByIdApi.reducer,
    [getTeacherProfileByIdApi.reducerPath]: getTeacherProfileByIdApi.reducer,
    [getAcceptedQuestionByIdApi.reducerPath]:
      getAcceptedQuestionByIdApi.reducer,
    [getEasyMediumHardByIdApi.reducerPath]: getEasyMediumHardByIdApi.reducer,
    [getNumberOfAllQuestionApi.reducerPath]: getNumberOfAllQuestionApi.reducer,
    [getAllStudentsApi.reducerPath]: getAllStudentsApi.reducer,
    [getExamQuestionByIdApi.reducerPath]: getExamQuestionByIdApi.reducer,
    [getAllExamsApi.reducerPath]: getAllExamsApi.reducer,
    [getTopSolvedQuestionsApi.reducerPath]: getTopSolvedQuestionsApi.reducer,
    [getWeeklyReportApi.reducerPath]: getWeeklyReportApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(getQuestionDetalApi.middleware)
      .concat(getAllQuestionApi.middleware)
      .concat(getSubmissionDetailByIdApi.middleware)
      .concat(getAllSubmissionsByIdApi.middleware)
      .concat(getTeacherProfileByIdApi.middleware)
      .concat(getStudentProfileByIdApi.middleware)
      .concat(getAcceptedQuestionByIdApi.middleware)
      .concat(getEasyMediumHardByIdApi.middleware)
      .concat(getNumberOfAllQuestionApi.middleware)
      .concat(getAllStudentsApi.middleware)
      .concat(getAllExamsApi.middleware)
      .concat(getTopSolvedQuestionsApi.middleware)
      .concat(getWeeklyReportApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
