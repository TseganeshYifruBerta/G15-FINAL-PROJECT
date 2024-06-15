import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignupState {
  name: string;
  userId: string;
  email: string;
  section: string;
  password: string;
 
}

const signupSliceStudent = createSlice({
  name: 'signup',
  initialState: {
    name:'',
    userId:'',
    email: '',
    section:'',
    password: '',
  } as SignupState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
        state.name = action.payload;
      },
    setUserId: (state, action: PayloadAction<string>) => {
        state.userId = action.payload;
      },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setSection: (state, action: PayloadAction<string>) => {
      state.section = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const {setName,setUserId, setEmail,setSection, setPassword } = signupSliceStudent.actions;
export default signupSliceStudent.reducer;