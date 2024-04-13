export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("usersExcelFile", file); // Make sure 'file' matches the expected field name in your backend.
  console.log(formData.get("usersExcelFile"), "hello world");
  // Retrieve your access token from wherever it's stored
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBVFIvMzMzMy8zMyIsImlkIjoxLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsInNlY3Rpb24iOltdLCJpYXQiOjE3MTI4NzA1NjJ9._TcXZ0V0BH3Tba7Nk9ppHGe-o-qhbYqqgZ8EEbzYdp0";

  try {
    const response = await fetch(
      "http://localhost:5000/upload/userDataUploader",
      {
        method: "POST",
        body: formData,
        headers: {
          // Include the Authorization header with the bearer token if it exists
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );


console.log(response)
if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.message); // Throw an error with the error message from the backend
}

const data = await response.json();
console.log("Success:", data);
return data; // Return the data for further processing
} catch (error) {
console.error("Error:", error);
throw error; // Re-throw the error for handling in the calling code
}
};
