export const uploadFile = async (file: File): Promise<any> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('File upload failed');
      }
  
      const data = await response.json();
      console.log('File uploaded:', data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };