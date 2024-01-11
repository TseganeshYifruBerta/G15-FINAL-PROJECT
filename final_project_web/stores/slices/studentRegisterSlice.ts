import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { studentRegisterProps, StudentRegState } from "../actions/studentRegisterAction";

const initialState: StudentRegState = {
  message: {
    name: "string",
    email: "string",
    userId: "string",
    section: "string",
    password:"string",
    confirmPassword:"string"
},
  
  loading: false,
  success: false,
  error: null,
};

const studentRegisterSlice = createSlice({
  name: "studentregister",
  initialState,
  reducers: {
    setResponseData: (state, action: PayloadAction<studentRegisterProps>) => {
      state.message = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    setError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setResponseData, setLoading, setSuccess, setError } =
  studentRegisterSlice.actions;

export default studentRegisterSlice.reducer;
