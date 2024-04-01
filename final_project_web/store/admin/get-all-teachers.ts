// src/api/teacherApi.ts
interface Section {
  section: string;
}

export type Teacher = {
  id:number;
    fullName?: string;
    userId: string;
    email?: string;
    SectionsOfUser?: Section[];
    role?: string;
    status?: string;
  };interface TeacherApiResponse {
    user: Teacher[];
  }
  
  const getAuthToken = () => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBVFIvMzMzMy8zMyIsImlkIjoyMiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJzZWN0aW9uIjpbXSwiaWF0IjoxNzEyMDAyMDMyfQ.6jllLz-85xHr6pNckAK8yZwF2O3V7bdwVm3cmWZwsVA";
  
  export const fetchAllTeachers = async (): Promise<TeacherApiResponse> => {
    try {
      const response = await fetch('http://localhost:5000/upload/fetchAllTeachers', {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonResponse = await response.json();
      const data: TeacherApiResponse = jsonResponse; // The correct type assertion
      console.log("API Response Data:", data); // Log the API response data for debugging
      return data; // Directly return the response data
    } catch (error) {
      console.error('Error fetching teachers:', error);
      throw error;
    }
  };
  /**
   * Updates a specific teacher's information.
   * @param userId The unique identifier of the teacher to update.
   * @param updateData The data to update for the teacher.
   * @returns A promise that resolves with the updated teacher data.
   */
 
  export const updateTeacher = async (id: number, updateData: Partial<Teacher>): Promise<Teacher> => {
    console.log("updateTeacher call:", { id, updateData });
    console.log("Attempting to update teacher with ID:", id); // Debug log
    if (id === undefined) {
      console.error("Undefined ID passed to updateTeacher");
      throw new Error("Undefined ID passed to updateTeacher");
    }
    try {
      const response = await fetch(`http://localhost:5000/upload/updateUser/${id}`, {
        method: 'PUT', // Assuming the update operation is done via a PUT request
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Teacher = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  };