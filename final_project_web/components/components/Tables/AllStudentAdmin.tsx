// Allstudent.tsx
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteUser,updateStudent,Student,fetchAllStudents } from '@/store/admin/get-all-students';
import { updateTeacher,Teacher,fetchAllTeachers } from '@/store/admin/get-all-teachers';
import EditStudentPopup from './EditStudentPopup';
import UploadPopup from "@/components/upload/popupform";
import { FiSearch } from 'react-icons/fi';
import { AcademicCapIcon, UserGroupIcon, LockOpenIcon,LockClosedIcon } from '@heroicons/react/24/solid';
import { showToast } from '@/components/popup';
import { AiOutlineClose } from 'react-icons/ai';


const AllStudent: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); 
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const getAuthToken = () => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBVFIvMzMzMy8zMyIsImlkIjoxLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsInNlY3Rpb24iOltdLCJpYXQiOjE3MTMwMTkyMDN9.9wdVM-xVHHKaqUZUXXTllmNdfVO-tpndtKMy6xyrHFY"

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
    getStudents();
  }, []);

  useEffect(() => {
    getTeachers();
  }, []);


  useEffect(() => {
    console.log(students); // Logs whenever 'students' changes
  }, [students]);
  
  const handleEditClick = (student: Student) => {
    console.log("Editing student:", student);
    setSelectedStudent(student);
    setIsEditPopupOpen(true);
  };
  

  
const handleActivateUser = async (id: number) => {
  setIsLoading(true);
  try {
    const response = await fetch(`http://localhost:5000/activateUser/activateUser`, {
      method: 'POST',
      
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json'
        },

      body: JSON.stringify({ userId: id.toString() }) // Send userId as a string in the body
    });
    const data = await response.json();
    if (response.ok) {
      setNewPassword(data.newPassword); // Save the new password
      setShowPasswordModal(true);
      showToast(`Student activated successfully. New password: ${data.newPassword}`, 'success');
      await getStudents(); // Refresh the list after activation
    } else {
      throw new Error(data.message || 'Failed to activate user');
    }
  } catch (error) {
    showToast('Error activating user: ' + (error as Error).message, 'error');
    console.error('Error activating user:', error);
  } finally {
    setIsLoading(false);
  }
};

// Render function and other parts of the component remain the same

  
  const handleDeleteUser = async (id:number) => {
    if (window.confirm('Are you sure you want to delete this student?')) { // Confirmation before deleting
      try {
        await deleteUser(id);
        showToast(`Student deleted successfully`, "success");
        await getStudents(); // Refresh the list after deleting
      } catch (error) {
        showToast('Error deleting user: ' + (error as Error).message, 'error');
        console.error('Error deleting user:', error);
      }
    }
  };
  
  const handleSave = async (updatedStudent: Student) => {
    setStudents(currentStudents => currentStudents.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    
    await getStudents();
    setIsEditPopupOpen(false);
};
const filteredStudents = students.filter(student =>
  (student.fullName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
  (student.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
  (student.SectionsOfUser?.some(section => (section.section?.toLowerCase() || '').includes(searchQuery.toLowerCase())))
);

  
const PasswordModal = ({ isOpen, newPassword, onClose }:any) => {
  if (!isOpen) return null;
  return (
    <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-xl shadow-lg relative">  {/* Added relative positioning here */}
                <button 
                    type='button'
                    onClick={onClose}
                    className="absolute mb-4 top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    <AiOutlineClose size={20} />
                    
                </button>

                <h3 className="text-lg mt-4 font-bold mb-4">Student Activated Successfully</h3>
                <p>Your new password is: <strong>{newPassword}</strong></p>
            </div>
        </div>
    </>
);

};
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  
  
  return (
    <div className="overflow-x-auto overflow-y-auto ">
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
      <div className="bg-gray-50 rounded-xl shadow-xl p-4 flex items-center justify-between">
          <div>
            <h4 className="text-xl font-semibold text-[#7983FB]">Teachers</h4>
            <p className="text-2xl font-bold text-[#7983FB]">{teachers.length}</p>
          </div>
          <AcademicCapIcon className="h-12 w-12 text-[#7983FB]" />
          </div>
          <div className="bg-gray-50 rounded-xl shadow-xl p-4 flex items-center justify-between">
          <div>
            <h4 className="text-xl font-semibold text-[#7983FB]">Students</h4>
          <p className="text-2xl font-bold text-[#7983FB]">{students.length}</p>
          </div>
          <UserGroupIcon className="h-12 w-12 text-[#7983FB]" />
        </div>
      </div>
    
     <div className="flex items-center justify-between space-x-4 mb-4">
     <div className="flex items-center space-x-2 w-full max-w-lg border-2 border-gray-200 bg-gray-100 rounded-xl shadow-lg overflow-hidden">
  <FiSearch className="ml-4 text-gray-400" />
  <input 
    type="text" 
    className="w-full p-2 outline-none"
    placeholder="Search by name, email, or section..." 
    value={searchQuery} 
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>
<UploadPopup onUploadSuccess={getStudents} />

</div>

      <div className='bg-gray-100 rounded-xl shadow-xl'>
      <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400">
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
        {filteredStudents.map((student) => (
            <tr key={student.id } className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="py-4 px-4">{student.fullName}</td>
              <td className="py-4 px-4">{student.userId}</td>
              <td className="py-4 px-4">{student.email}</td>
              <td className="py-4 px-4">
                {student.SectionsOfUser?.map((sec, index) => (
                  <span key={index}>{sec.section}{index < (student.SectionsOfUser?.length ?? 0) - 1 ? ', ' : ''}</span>
                ))}
              </td>
              <td className="py-4 px-4">{student.role}</td>
              <td className="py-4 px-4">
      {student.status === 'active' ? (
        <button className="bg-green-200 text-green-800 px-4 py-2 rounded shadow disabled:opacity-50" disabled>
          Active
        </button>
      ) : (
        <button
          className="bg-[#7983FB] bg-opacity-30 text-[#7983FB] hover:bg-[#7983FB] hover:bg-opacity-60 px-2 py-2 rounded shadow "
          onClick={() => handleActivateUser(student.id)}
        >
          Activate 
        </button>
      )}
    </td>
              <td className="py-4 px-4 flex items-center gap-4">
              <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => handleEditClick(student)}
            >
              <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        color="#7983FB"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 mx-2 rounded-full bg-[#7983FB] bg-opacity-30 pt-2 py-2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z
"
                        />
                      </svg>
            </button>
            <button
        onClick={() => handleDeleteUser(student.id)}
        className="text-red-500 hover:text-red-700"
      >
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        color="red"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 mx-2 rounded-full bg-red-100 bg-opacity-30 p-2"
                      >
                        <path
                          strokeLinecap="round"
                          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
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
<PasswordModal isOpen={showPasswordModal} newPassword={newPassword} onClose={() => setShowPasswordModal(false)} />
    </div>
    </div>
  );
};

export default AllStudent;
