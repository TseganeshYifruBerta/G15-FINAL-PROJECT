// store/info/info_Api.ts
export async function fetchInfoQuestion() {
    try {
      const response = await fetch(`${URL}/information/getNumberOfAllQuestion`, {
        method: 'GET',
        headers: {
          Authorization: '',
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      return data; // Ensure this returns an object with a `count` property
    } catch (error) {
      console.error('Error fetching info:', error);
      throw error;
    }
  }
  
  export async function fetchInfoUsers() {
    try {
      const response = await fetch(`${URL}/information/numberAllUser`, {
        method: 'GET',
        headers: {
          Authorization: '',
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      return data; // Ensure this returns an object with a `count` property
    } catch (error) {
      console.error('Error fetching info:', error);
      throw error;
    }
  }
  