import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Section {
  section: string;
}

interface Student {
  id:number;
  fullName?: string;
  userId: string; // Assuming userId is always present for identification
  email?: string;
  SectionsOfUser?: Section[];section?: string;
  role?: string;
  status?: string;
}

interface StudentState {
  list: Student[];
}

const initialState: StudentState = {
  list: [],
};

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<Student[]>) => {
      state.list = action.payload;
    },
    addStudent: (state, action: PayloadAction<Student>) => {
      state.list.push(action.payload);
    },
    updateStudent: (state, action: PayloadAction<{id: number, updates: Partial<Student>}>) => {
        const { id, updates } = action.payload;
        const index = state.list.findIndex(student => student.id === id);
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...updates };
        }
      },
      deleteStudent: (state, action: PayloadAction<string>) => {
        state.list = state.list.filter(student => student.userId !== action.payload);
      },
  },
});

export const { setStudents, addStudent, updateStudent, deleteStudent } = studentSlice.actions;

// Selector to get the entire list of Students
export const selectStudents = (state: any) => state.student.list; // Adjust 'any' to your AppState type

export default studentSlice.reducer;
