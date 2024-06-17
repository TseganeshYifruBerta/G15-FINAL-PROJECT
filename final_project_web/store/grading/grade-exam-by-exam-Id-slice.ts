import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GradingState {
  examId: string;
 
}

const gradingExamSlice = createSlice({
  name: "grading",
  initialState: {
    examId: "",
    
  } as GradingState,
  reducers: {
    setExamId: (state, action: PayloadAction<string>) => {
      state.examId = action.payload;
    },
    
  },
});

export const { setExamId } =
gradingExamSlice.actions;
export default gradingExamSlice.reducer;
