import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlagiarismCheckState {
  examId: string;
 
}

const PlagiarismCheckSlice = createSlice({
  name: "questionupload",
  initialState: {
    examId: "",
    
  } as PlagiarismCheckState,
  reducers: {
    setExamId: (state, action: PayloadAction<string>) => {
      state.examId = action.payload;
    },
    
  },
});

export const { setExamId } =
PlagiarismCheckSlice.actions;
export default PlagiarismCheckSlice.reducer;
