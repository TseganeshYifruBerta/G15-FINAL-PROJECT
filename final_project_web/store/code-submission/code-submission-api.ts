export type SubmissionFormData = {
  questionId: string;
  pythonCode: string;
  id : string
};

export const codesubmission = async (formData: SubmissionFormData) => {
     const token = localStorage.getItem("token");
console.log(formData, "formdata")
  try {
    const response = await fetch(
      "http://localhost:5000/codeSubmission/submitCode",
      {
        method: "POST",
        // CC
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
    console.error("Error:eeeeeeeeee", error);
    throw error; // Re-throw the error for handling in the calling code
  }
};
