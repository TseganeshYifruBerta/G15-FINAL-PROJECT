import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Section {
  section: string;
  id?: number;
}

interface Teacher {
  id:number;
  fullName?: string;
  userId: string; // Assuming userId is always present for identification
  email?: string;
  SectionsOfUser?: Section[]
  role?: string;
  status?: string;
}
interface AddSectionsParams {
  userId: string;
  section: string;
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
    updateTeacher: (state, action: PayloadAction<{id: number, updates: Partial<Teacher>}>) => {
      const { id, updates } = action.payload;
        const index = state.list.findIndex(student => student.id === id);
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...updates };
        }
    },
    deleteTeacher: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(teacher => teacher.userId !== action.payload);
    },
    addSections: (state, action: PayloadAction<AddSectionsParams>) => {
      const { userId, section } = action.payload;
      const student = state.list.find((student) => student.userId === userId);
      if (student) {
        // If the student is found, add the new section to their SectionsOfUser array
        if (!student.SectionsOfUser) {
          student.SectionsOfUser = [];
        }
        student.SectionsOfUser.push({ section });
      }
    },
  },
});

export const { setTeachers, addSections,addTeacher, updateTeacher, deleteTeacher } = teacherSlice.actions;

// Selector to get the entire list of teachers
export const selectTeachers = (state: any) => state.teacher.list; // Adjust 'any' to your AppState type

export default teacherSlice.reducer;