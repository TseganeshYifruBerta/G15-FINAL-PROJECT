// src/pages/TeachersPage.tsx
import React from "react";
import dynamic from 'next/dynamic';

const StudentList = dynamic(
  () => import("@/components/components/Tables/AllStudentAdmin"),
  {
    ssr: false,
  }
);
const StudentsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-semibold mb-4">Student List</h1>


      <StudentList />
    </div>

  );
};

export default StudentsPage;