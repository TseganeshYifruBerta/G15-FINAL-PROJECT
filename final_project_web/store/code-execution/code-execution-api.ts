export type ExecutionFormData = {
  questionId: string;
  pythonCode: string;
};

export const codeexecution = async (formData: ExecutionFormData) => {
       const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      "https://g15-final-project-backend.onrender.com/execution/run",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(formData),
      }
    );

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
