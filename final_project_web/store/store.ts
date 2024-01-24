import { combineReducers, Dispatch } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { useDispatch } from 'react-redux';
import signupTeacherReducer from '../reducer/signupSliceReducerTeacher';
import signupStudentReducer from '../reducer/SignupSliceReducerStudent';
import signinTeacherReducer from '../reducer/signinSliceReducerTearcher';
import signinStudentReducer from '../reducer/signinSliceReducerStudent';

const rootReducer = combineReducers({
  form: formReducer,
  login: signinTeacherReducer,
  signinStudentReducer,
  register: signupTeacherReducer,
  signupStudentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = Dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default rootReducer;

