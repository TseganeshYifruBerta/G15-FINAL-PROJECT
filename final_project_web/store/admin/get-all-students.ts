// src/api/StudentApi.ts
interface Section {
    section: string;
  }
  
 export type Student = {
      id:number;
      fullName?: string;
      userId: string;
      email?: string;
      SectionsOfUser?: Section[];
      role?: string;
      status?: string;
    };
    interface StudentApiResponse {
      user: Student[];
    }
    
    const getAuthToken = () => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBVFIvMzMzMy8zMyIsImlkIjoyMiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJzZWN0aW9uIjpbXSwiaWF0IjoxNzEyMDAyMDMyfQ.6jllLz-85xHr6pNckAK8yZwF2O3V7bdwVm3cmWZwsVA";
    
    export const fetchAllStudents = async (): Promise<StudentApiResponse> => {
      try {
        const response = await fetch('http://localhost:5000/upload/fetchAllStudents?_=${new Date().getTime()}', {
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
        const data: StudentApiResponse = jsonResponse; // The correct type assertion
        console.log("API Response Data:", data); // Log the API response data for debugging
        return data; // Directly return the response data
      } catch (error) {
        console.error('Error fetching Students:', error);
        throw error;
      }
    };
    // Simulate fetching detailed student info, assuming `id` is the student's ID
async function fetchStudentDetails(id: number): Promise<Student> {
  // Example implementation, replace with actual data fetching logic
  try {
    const response = await fetch(`https://your-api/students/${id}`);
    if (!response.ok) throw new Error('Failed to fetch');
    const studentDetails: Student = await response.json();
    return studentDetails;
  } catch (error) {
    console.error('Failed to fetch student details:', error);
    throw error; // Re-throw to be handled by caller
  }
}

    /**
     * Updates a specific Student's information.
     * @param userId The unique identifier of the Student to update.
     * @param updateData The data to update for the Student.
     * @returns A promise that resolves with the updated Student data.
     */
    export const updateStudent = async (id: number, updateData: Partial<Student>): Promise<Student> => {
      console.log("updateStudent call:", { id, updateData });
      console.log("Attempting to update student with ID:", id); // Debug log
      if (id === undefined) {
        console.error("Undefined ID passed to updateStudent");
        throw new Error("Undefined ID passed to updateStudent");
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
        const data: Student = await response.json();
        return data;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
      }
    };
    