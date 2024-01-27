import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StudentSignInState {
  userId: string;
  password: string;
 
}

const signinStudentSlice = createSlice({
  name: "studentsignin",
  initialState: {
    userId: "",
    password: "",
  } as StudentSignInState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const {setUserId, setPassword } = signinStudentSlice.actions;
export default signinStudentSlice.reducer;