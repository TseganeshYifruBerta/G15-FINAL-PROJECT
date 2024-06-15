// src/api/StudentApi.ts
import { URL } from "../host";

export type Section = {
  id?: number;
  section: string;
}
  export type Student = {
    id: number;
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
    interface UpdateStudentParams {
      id: number;
      updateData: Partial<Student>;
    }
    
    interface AddSectionsParams{
      userId?: string;
      sections: string;
    }
    
     
    export const fetchAllStudents = async (token: string | null): Promise<StudentApiResponse> => {
      try {
        const response = await fetch(
          `${URL}/upload/fetchAllStudents`,
          {
            method: "GET",
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "Content-Type": "application/json",
            },
          }
        );
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
    export const updateStudent = async (token: string | null,{ id, updateData }: UpdateStudentParams): Promise<any> => {
      try {
        console.log('Sending update payload to server:', JSON.stringify(updateData)); // Debugging line
        const response = await fetch(`${URL}/upload/updateUser/${id}`, {
          method: "PUT",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('There was a problem with the update operation:', error);
        throw error;
      }
    };
    
   
    
    export const addSections = async (token: string | null,{ userId, sections }: { userId: string, sections: string }): Promise<any> => {
      try {
        console.log("Sending payload to server:", JSON.stringify({ userId, sections }));

    
        const response = await fetch(`${URL}/upload/AddSections`, {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, sections }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; // Assuming the backend returns the added sections
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
      }
    };
    
    export const deleteSection = async (token: string | null, sectionId: number): Promise<any> => {
      try {
        const response = await fetch(
          `${URL}/upload/DeleteSections/${sectionId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('There was a problem with the delete operation:', error);
        throw error;
      }
    };
    
    export const deleteUser = async ( token: string | null, id: number): Promise<any> => {
      try {
        
        const response = await fetch(`${URL}/upload/deleteUser/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('There was a problem with the delete operation:', error);
        throw error;
      }
    };
    export const activateUser = async (token: string | null, userId: number): Promise<any> => {
      if (!token) {
          throw new Error("Authentication token not found");
      }
  
      try {
          const response = await fetch(
            `${URL}/activateUser/activateUser`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId }),
            }
          );
  
          const data = await response.json();
  
          if (!response.ok) {
              throw new Error(data.message || 'Failed to activate user');
          }
  
          return data; // This might include some user details and new password
      } catch (error) {
          console.error('Error activating user:', error);
          throw error; // Rethrow the error to be handled by the caller
      }
  };
  