import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddTestcaseState {
  testCases: any[];
  questionId: string;
}

const addExamTestcaseSlice = createSlice({
  name: "addexamtestcase",
  initialState: {
    testCases: [],
    questionId: "",
  } as AddTestcaseState,
  reducers: {
    seTestcases: (state, action: PayloadAction<any[]>) => {
      state.testCases = action.payload;
    },
  },
});

export const { seTestcases } = addExamTestcaseSlice.actions;
export default addExamTestcaseSlice.reducer;
