// RootState.ts
import { combineReducers } from "@reduxjs/toolkit";
import questionReducer from "./questionSlice";

const rootReducer = combineReducers({
  question: questionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
