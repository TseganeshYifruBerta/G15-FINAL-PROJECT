import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CriteriaUploadState {
  examId: string
  examQuestionId:string
  timeComplexity:string
  codeQuality:string
  codeComment:string
  codeCorrectness:string
  teacherId:string
  gradeValue:string
}

const criteriaUploadSlice = createSlice({
  name: "examupload",
  initialState: {
     examId: "",
  examQuestionId:"",
  timeComplexity:"",
  codeQuality:"",
  codeComment:"",
  codeCorrectness:"",
  teacherId:"",
  gradeValue:"",
  } as CriteriaUploadState,
  reducers: {
    setExamId: (state, action: PayloadAction<string>) => {
      state.examId = action.payload;
    },
    setExamQuestionId: (state, action: PayloadAction<string>) => {
      state.examQuestionId = action.payload;
    },
    setTimeComplexity: (state, action: PayloadAction<string>) => {
      state.timeComplexity = action.payload;
    },
    setCodeQuality: (state, action: PayloadAction<string>) => {
      state.codeQuality = action.payload;
    },
    setCodeComment: (state, action: PayloadAction<string>) => {
      state.codeComment = action.payload;
    },
    setCodeCorrectness: (state, action: PayloadAction<string>) => {
      state.codeCorrectness = action.payload;
    },
    setTeacherId: (state, action: PayloadAction<string>) => {
      state.teacherId = action.payload;
    },
    setGradeValue: (state, action: PayloadAction<string>) => {
      state.gradeValue = action.payload;
    },
  },
});

export const {
  setExamId,
  setExamQuestionId,
  setTimeComplexity,
  setCodeQuality,
  setCodeComment,
  setCodeCorrectness,
  setTeacherId,
  setGradeValue,
} = criteriaUploadSlice.actions;
export default criteriaUploadSlice.reducer;
