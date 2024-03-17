import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExamUploadState {
  title: string;
  date_and_time: string;
  instruction: string;
  duration: string;
  sections: string[];
  questions: string[];
}

const examUploadSlice = createSlice({
  name: "examupload",
  initialState: {
    title: "",
    date_and_time: "",
    instruction: "",
    duration: "",
    sections: [],
    questions: [],
  } as ExamUploadState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setdate_and_time: (state, action: PayloadAction<string>) => {
      state.date_and_time = action.payload;
    },
    setInstruction: (state, action: PayloadAction<string>) => {
      state.instruction = action.payload;
    },
    setDuration: (state, action: PayloadAction<string>) => {
      state.duration = action.payload;
    },
    setSections: (state, action: PayloadAction<string[]>) => {
      state.sections = action.payload;
    },
    setQuestions: (state, action: PayloadAction<string[]>) => {
      state.questions = action.payload;
    },
  },
});

export const {
  setDuration,
  setInstruction,
  setQuestions,
  setTitle,
  setdate_and_time,
  setSections,
} = examUploadSlice.actions;
export default examUploadSlice.reducer;
