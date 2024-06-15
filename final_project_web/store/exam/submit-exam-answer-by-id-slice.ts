import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExamAnswerUploadState {
  examId: string;
  userId: string;
  questionId: string;
  submittedAnswer: string;
}

const examAnswerUploadSlice = createSlice({
  name: "examquestionupload",
  initialState: {
    examId: "",
    userId: "",
    questionId: "",
    submittedAnswer: "",
  } as ExamAnswerUploadState,
  reducers: {
    setExamId: (state, action: PayloadAction<string>) => {
      state.examId = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setQuestionId: (state, action: PayloadAction<string>) => {
      state.questionId = action.payload;
    },
    setSubmittedAnswer: (state, action: PayloadAction<string>) => {
      state.submittedAnswer = action.payload;
    },
  },
});

export const { setExamId, setUserId, setQuestionId, setSubmittedAnswer } =
  examAnswerUploadSlice.actions;
export default examAnswerUploadSlice.reducer;
