// src/pages/TeachersPage.tsx
import React from "react";
import StudentList from "@/components/components/Tables/AllStudentAdmin";

const TeachersPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-semibold mb-4">Student List</h1>
      <StudentList />
    </div>
  );
};

export default TeachersPage;
