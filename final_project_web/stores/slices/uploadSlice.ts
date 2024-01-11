import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  QuestionProps,
  QuestionState,
  testCasesProps,
} from "@/stores/actions/uploadAction";

const initialState: QuestionState = {
  message: "",
  question: {
    id: 0,
    title: "",
    difficulty: "",
    description: "",
    example: "",
    updatedAt: "",
    createdAt: "",
  },
  testCases: [{ input: { nums: [0, 8, 9], target: 9 }, output: [0, 9, 8] }],
  loading: false,
  success: false,
  error: null,
};

const questionSlice = createSlice({
  name: "questionupload",
  initialState,
  reducers: {
    setResponseData: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setQuestion: (state, action: PayloadAction<QuestionProps>) => {
      state.question = action.payload;
    },
    setTestCases: (state, action: PayloadAction<testCasesProps[]>) => {
      state.testCases = action.payload;
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

export const {
  setResponseData,
  setQuestion,
  setTestCases,
  setLoading,
  setSuccess,
  setError,
} = questionSlice.actions;

export default questionSlice.reducer;
