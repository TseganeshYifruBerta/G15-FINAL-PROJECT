import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StudentSignInState {
  token: string;
    userId: number;
    email: string;
    role: string;
    section: [];
    iat: number;
}

const loginSlice = createSlice({
  name: "studentsignin",
  initialState: {
    token: "",
    userId: 0,
    email: "",
    role: "",
    section: [],
    iat: 0,
  } as StudentSignInState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setSection: (state, action: PayloadAction<[]>) => {
      state.section = action.payload;
    },
    setIat: (state, action: PayloadAction<number>) => {
      state.iat = action.payload;}
  },
});

export const { setToken, setEmail, setRole, setSection, setUserId, setIat } = loginSlice.actions;
export default loginSlice.reducer;
