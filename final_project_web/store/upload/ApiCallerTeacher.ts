export type FileData = {
  selectedFile: File | null;
};

export const uploadFile = async (formData: FileData)  => {
  try {
    
    

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log("////////",formData);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    console.log('File uploaded:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};