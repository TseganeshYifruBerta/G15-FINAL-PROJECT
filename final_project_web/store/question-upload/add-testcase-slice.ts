import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddTestcaseState {
  testCases: any[];
  questionId: string;
}

const addTestcaseSlice = createSlice({
  name: "addtestcase",
  initialState: {
      testCases:[],
  questionId: "",
  } as AddTestcaseState,
  reducers: {
    seTestcases: (state, action: PayloadAction<any[]>) => {
      state.testCases = action.payload;
    },
  },
});

export const { seTestcases } = addTestcaseSlice.actions;
export default addTestcaseSlice.reducer;
