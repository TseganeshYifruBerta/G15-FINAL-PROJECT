import NavigationTeacher from "@/components/layout/NavigationTeacher";
import QuestionCard from "@/components/questions/QuestionCard";
import QuestionCardStudent from "@/components/questions/QuestionCardStudent";
import StudentsListsCard from "@/components/student/StudentsListsCard";
import { useGetAllStudentsQuery } from "@/store/teacherprofile/get-all-students";
import { useState } from "react";
export interface studentProps {
  id: number;
  name: string;
  userID: string;
  email: string;
  section: string;
  createdAt: string;
  updatedAt: string;
}

function Students() {
  const { data: allstudents, isLoading, isError } = useGetAllStudentsQuery("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>Error</div>;

  const filteredStudents = allstudents.filter(
    (student: studentProps) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter ? student.section === filter : true)
  );

  return (
    <div className="p-6 min-h-screen bg-white w-full">
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search for students..."
          className="w-2/3 px-4 py-2 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="mt-2 w-1/3 ml-2 px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary shadow"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Sections</option>
          {/* Dynamically list sections here */}
        </select>
      </div>
      <div>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student: studentProps) => (
            <StudentsListsCard
              key={student.id}
              id={student.id}
              name={student.name}
              userID={student.userID}
              email={student.email}
              section={student.section}
              createdAt={student.createdAt}
              updatedAt={student.updatedAt}
            />
          ))
        ) : (
          <div>No students found</div>
        )}
      </div>
    </div>
  );
}

export default Students;
