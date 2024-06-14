import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadState {
    fullName?: string;
    userId?: string;
    email?: string;
    section?: string;
    role?: string;
    status?: string;
 
}

const UploadManually = createSlice({
  name: 'uploadpop',
  initialState: {
   fullName:'',
    userId:'',
    email: '',
    section:'',
    role:'',
    status: '',

  } as UploadState,
  reducers: {
    setFullName: (state, action: PayloadAction<string>) => {
        state.fullName = action.payload;
      },
    setUserId: (state, action: PayloadAction<string>) => {
        state.userId = action.payload;
      },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setSection: (state, action: PayloadAction<string>) => {
      state.section = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export const {setFullName,setUserId, setEmail,setSection, setRole, setStatus } = UploadManually.actions;
export default UploadManually.reducer;