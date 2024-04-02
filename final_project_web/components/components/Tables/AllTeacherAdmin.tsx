// AllTeacher.tsx
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { updateTeacher,Teacher,fetchAllTeachers } from '@/store/admin/get-all-teachers';
import EditTeacherPopup from './EditTeacherPopup';



const AllTeacher: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedteacher, setSelectedteacher] = useState<Teacher | null>(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);



    const getTeachers = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetchAllTeachers();
if (response.user) {
  setTeachers(response.user);
} else {
  console.error('Error: response does not have a user property', response);
  setError('Failed to load teachers due to unexpected data format.');
}
      } catch (error) {
        console.error('Error fetching teachers:', error);
        setError('Failed to load teachers.');
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      getTeachers();
    }, []);
  
  useEffect(() => {
    console.log(teachers); // Logs whenever 'teachers' changes
  }, [teachers]);
  
  const handleEditClick = (teacher: Teacher) => {
    console.log("Editing teacher:", teacher);
    setSelectedteacher(teacher);
    setIsEditPopupOpen(true);
  };
  const handleSave = async (updatedTeacher: Teacher) => {
    setTeachers(currentTeacher => currentTeacher.map(teacher => 
        teacher.id === updatedTeacher.id ? updatedTeacher: teacher
    ));
    await getTeachers();
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
          {teachers.map((teacher) => (
            <tr key={teacher.userId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="py-4 px-4">{teacher.fullName}</td>
              <td className="py-4 px-4">{teacher.userId}</td>
              <td className="py-4 px-4">{teacher.email}</td>
              <td className="py-4 px-4">
                {teacher.SectionsOfUser?.map((sec, index) => (
                  <span key={index}>{sec.section}{index < (teacher.SectionsOfUser?.length ?? 0) - 1 ? ', ' : ''}</span>
                ))}
              </td>
              <td className="py-4 px-4">{teacher.role}</td>
              <td className="py-4 px-4">{teacher.status}</td>
              <td className="py-4 px-4 flex items-center gap-4">
                <button className="text-blue-500 hover:text-blue-700"
                 onClick={() => handleEditClick(teacher)}>
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
      {isEditPopupOpen && selectedteacher && (
        
        <EditTeacherPopup
        key={selectedteacher.id}
          teacher={selectedteacher}
          onClose={() => setIsEditPopupOpen(false)}
          onSave={handleSave} 
        />
      )}
    </div>
  );
};

export default AllTeacher;
