// Adjust this URL to your actual backend URL
const URL = 'http://127.0.0.1:5000';

export async function fetchInfoQuestion() {
  try {
    const response = await fetch(`${URL}/information/getNumberOfAllQuestion`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    console.log('Fetched questions data:', data); // Debugging
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
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    console.log('Fetched users data:', data); // Debugging
    return data; // Ensure this returns an object with a `count` property
  } catch (error) {
    console.error('Error fetching info:', error);
    throw error;
  }
}
