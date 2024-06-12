import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddSolutionState {
  content: any[];
  examQuestionId: string;
}

const addExamSolutionSlice = createSlice({
  name: "addexamsolution",
  initialState: {
    content: [],
    examQuestionId: "",
  } as AddSolutionState,
  reducers: {
    seTestcases: (state, action: PayloadAction<any[]>) => {
      state.content = action.payload;
    },
  },
});

export const { seTestcases } = addExamSolutionSlice.actions;
export default addExamSolutionSlice.reducer;
