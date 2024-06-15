import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExecutionState {
  questionId: string;
  pythonCode: string;
}

const codeExecutionSlice = createSlice({
  name: "codeexecution",
  initialState: {
    questionId: "",
    pythonCode:""
  } as ExecutionState,
  reducers: {
    setQuestionId: (state, action: PayloadAction<string>) => {
      state.questionId = action.payload;
    },
    setPythonCode: (state, action: PayloadAction<string>) => {
      state.pythonCode = action.payload;
    },
   
  },
});

export const { setQuestionId, setPythonCode } =
  codeExecutionSlice.actions;
export default codeExecutionSlice.reducer;
