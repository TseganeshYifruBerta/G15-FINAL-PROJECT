export type TeacherLoginFormData = {
  email: string;
  password: string;
};

export const teacherlogin = async (formData: TeacherLoginFormData) => {
  try {
    const response = await fetch("http://localhost:5000/login/teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    // if (response.ok) {
    //   const responseData = await response.json();
      // if (responseData.token) {
      //   // Token is present in the response data
      //   localStorage.setItem("teachertoken", responseData.token); // Store the token in local storage
      //   return responseData;
      // } else {
      //   throw new Error("Token not found in the response data");
      // }
      // if (responseData.userId){

      // }
    // } else {
    //   const errorData = await response.json();
    //   throw new Error(errorData.message || "Network response was not ok");
    // }

    const data = await response.json();
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
