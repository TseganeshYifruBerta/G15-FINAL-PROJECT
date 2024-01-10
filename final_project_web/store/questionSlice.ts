// questionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionState {
  title: string;
  difficulty: string;
  description: string;
  examples: string;
  input: string;
  output: string;
}

const initialState: QuestionState = {
  title: "",
  difficulty: "",
  description: "",
  examples: "",
  input: "",
  output: "",
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setFieldValue: (
      state,
      action: PayloadAction<{ field: keyof QuestionState; value: string }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setFieldValue, resetForm } = questionSlice.actions;

export default questionSlice.reducer;
