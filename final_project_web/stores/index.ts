import { configureStore } from "@reduxjs/toolkit";
import uploadquestion from "@/stores/slices/uploadSlice";
import studentregister from "@/stores/slices/studentRegisterSlice"
const store = configureStore({
  reducer: {
    uploadquestion: uploadquestion,
    studentregister: studentregister,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
