import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadState {
  selectedFile: File | null;
}

// const initialState: UploadState = {
//   selectedFile: null,
// };

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    selectedFile: null,
  } as UploadState,
  reducers: {
    setSelectedFile: (state, action: PayloadAction<File | null>) => {
      state.selectedFile = action.payload;
    },
  },
});

export const { setSelectedFile } = uploadSlice.actions;
export default uploadSlice.reducer;