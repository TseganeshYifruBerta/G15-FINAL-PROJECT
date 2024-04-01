// Allstudent.tsx
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Student,fetchAllStudents } from '@/store/admin/get-all-students';
import {updateStudent} from '@/store/admin/get-all-students';
import EditStudentPopup from './EditStudentPopup';



const AllStudent: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); 
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);


  const getStudents = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetchAllStudents();
      if (response.user) {
        console.log(response.user); // After fetchAllStudents call
        
       setStudents(response.user);
console.log(students); // This might not log updated state immediately due to setState being asynchronous

      } else {
        console.error('Error: response does not have a user property', response);
        setError('Failed to load students due to unexpected data format.');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to load students.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);
  useEffect(() => {
    console.log(students); // Logs whenever 'students' changes
  }, [students]);
  
  const handleEditClick = (student: Student) => {
    console.log("Editing student:", student);
    setSelectedStudent(student);
    setIsEditPopupOpen(true);
  };
  const handleSave = async (updatedStudent: Student) => {
    setStudents(currentStudents => currentStudents.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    
    await getStudents();
    setIsEditPopupOpen(false);
};

  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  
  return (
    <div className="overflow-x-auto rounded-2xl relative shadow-xl sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-3">Full Name</th>
            <th scope="col" className="py-3 px-3">User ID</th>
            <th scope="col" className="py-3 px-3">Email</th>
            <th scope="col" className="py-3 px-3">Section</th>
            <th scope="col" className="py-3 px-3">Role</th>
            <th scope="col" className="py-3 px-3">Status</th>
            <th scope="col" className="py-3 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.userId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="py-4 px-4">{student.fullName}</td>
              <td className="py-4 px-4">{student.userId}</td>
              <td className="py-4 px-4">{student.email}</td>
              <td className="py-4 px-4">
                {student.SectionsOfUser?.map((sec, index) => (
                  <span key={index}>{sec.section}{index < (student.SectionsOfUser?.length ?? 0) - 1 ? ', ' : ''}</span>
                ))}
              </td>
              <td className="py-4 px-4">{student.role}</td>
              <td className="py-4 px-4">{student.status}</td>
              <td className="py-4 px-4 flex items-center gap-4">
              <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => handleEditClick(student)}
            >
              <FaEdit />
            </button>
                <button className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditPopupOpen && selectedStudent && (
        
        <EditStudentPopup
        key={selectedStudent.id}
          student={selectedStudent}
          onClose={() => setIsEditPopupOpen(false)}
          onSave={handleSave} 
        />
      )}

    </div>
  );
};

export default AllStudent;
