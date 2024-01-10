import { configureStore } from "@reduxjs/toolkit";
import uploadquestion from "@/stores/slices/uploadSlice";

const store = configureStore({
  reducer: {
    uploadquestion: uploadquestion,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
