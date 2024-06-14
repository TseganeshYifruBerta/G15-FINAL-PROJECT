import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignupState {
  fullName: string;
  email: string;
  section: string;
  password: string;
}

const signupSliceTeacher = createSlice({
  name: "signup",
  initialState: {
    fullName: "",
    email: "",
    section: "",
    password: "",
  } as SignupState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
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

export const { setName, setEmail, setSection, setPassword } =
  signupSliceTeacher.actions;
export default signupSliceTeacher.reducer;
