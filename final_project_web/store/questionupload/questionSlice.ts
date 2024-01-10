// questionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const uploadQuestion:any = createAsyncThunk(
  "question/upload",
  async (questionDetails, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5000/question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionDetails),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadQuestion.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(uploadQuestion.rejected, (state:any, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default questionSlice.reducer;
