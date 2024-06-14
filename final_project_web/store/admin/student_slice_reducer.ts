import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Section {
  section: string;
  id?: number;
}

interface Student {
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

export const { setStudents, addSections,addStudent, updateStudent, deleteStudent } = studentSlice.actions;

// Selector to get the entire list of Students
export const selectStudents = (state: any) => state.student.list; // Adjust 'any' to your AppState type

export default studentSlice.reducer;