export type SubmissionFormData = {
  questionId: string;
  pythonCode: string;
  userId : string
};

export const codesubmission = async (formData: SubmissionFormData) => {
  try {
    const response = await fetch("http://localhost:5000/execution/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

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
