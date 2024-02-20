import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TeacherSignInState {
  email: string;
  password: string;
}

const signinTeacherSlice = createSlice({
  name: "teachersignin",
  initialState: {
    email: "",
    password: "",
  } as TeacherSignInState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const { setEmail, setPassword } = signinTeacherSlice.actions;
export default signinTeacherSlice.reducer;
