import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubmissionState {
  questionId: string;
  pythonCode: string;
  userId: string
}

const codeExecutionSlice = createSlice({
  name: "codesubmission",
  initialState: {
    questionId: "",
    pythonCode: "",
    userId: "",
  } as SubmissionState,
  reducers: {
    setQuestionId: (state, action: PayloadAction<string>) => {
      state.questionId = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setPythonCode: (state, action: PayloadAction<string>) => {
      state.pythonCode = action.payload;
    },
  },
});

export const { setQuestionId, setPythonCode, setUserId } = codeExecutionSlice.actions;
export default codeExecutionSlice.reducer;
