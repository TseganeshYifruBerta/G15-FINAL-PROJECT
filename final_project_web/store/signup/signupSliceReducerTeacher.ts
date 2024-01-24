import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignupState {
  name: string;
  userId: string;
  email: string;
  section: string;
  password: string;
 
}

const signupSliceTeacher = createSlice({
  name: 'signup',
  initialState: {
    name:'',
    email: '',
    section:'',
    password: '',
  } as SignupState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
        state.name = action.payload;
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

export const {setName, setEmail,setSection, setPassword } = signupSliceTeacher.actions;
export default signupSliceTeacher.reducer;