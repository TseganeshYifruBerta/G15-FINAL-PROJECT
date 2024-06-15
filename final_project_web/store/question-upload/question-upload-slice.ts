import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionUploadState {
  title: string;
  difficulty: string;
  description: string;
  example: string;
  testCases: string[];
}

const questionUploadSlice = createSlice({
  name: "questionupload",
  initialState: {
    title: "",
    difficulty: "",
    description: "",
    example: "",
    testCases: ["{name:'', grade:''}"],
  } as QuestionUploadState,
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
      state.testCases = action.payload;
    },
  },
});

export const { setTitle, setDifficulty, setDescription, setExample, setTestCases } =
  questionUploadSlice.actions;
export default questionUploadSlice.reducer;
