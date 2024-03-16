import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExamQuestionUploadState {
  title: string;
  difficulty: string;
  description: string;
  example: string;
  testcases: string[];
  solution: string;
}

const examQuestionUploadSlice = createSlice({
  name: "examquestionupload",
  initialState: {
    title: "",
    difficulty: "",
    description: "",
    example: "",
    testcases: ["{name:'', grade:''}"],
    solution: "",
  } as ExamQuestionUploadState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<string>) => {
      state.difficulty = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setExample: (state, action: PayloadAction<string>) => {
      state.example = action.payload;
    },
    setTestCases: (state, action: PayloadAction<string[]>) => {
      state.testcases = action.payload;
    },
    setSolution: (state, action: PayloadAction<string>) => {
      state.solution = action.payload;
    },
  },
});

export const {
  setTitle,
  setDifficulty,
  setDescription,
  setExample,
  setTestCases,
  setSolution
} = examQuestionUploadSlice.actions;
export default examQuestionUploadSlice.reducer;
