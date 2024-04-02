import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Section {
  section: string;
}

interface Teacher {
  fullName?: string;
  userId: string; // Assuming userId is always present for identification
  email?: string;
  SectionsOfUser?: Section[];section?: string;
  role?: string;
  status?: string;
}

interface TeacherState {
  list: Teacher[];
}

const initialState: TeacherState = {
  list: [],
};

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setTeachers: (state, action: PayloadAction<Teacher[]>) => {
      state.list = action.payload;
    },
    addTeacher: (state, action: PayloadAction<Teacher>) => {
      state.list.push(action.payload);
    },
    updateTeacher: (state, action: PayloadAction<Teacher>) => {
      const index = state.list.findIndex(teacher => teacher.userId === action.payload.userId);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },
    deleteTeacher: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(teacher => teacher.userId !== action.payload);
    },
  },
});

export const { setTeachers, addTeacher, updateTeacher, deleteTeacher } = teacherSlice.actions;

// Selector to get the entire list of teachers
export const selectTeachers = (state: any) => state.teacher.list; // Adjust 'any' to your AppState type

export default teacherSlice.reducer;
