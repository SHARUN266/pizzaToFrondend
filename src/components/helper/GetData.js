// Function to fetch existing data from the server
import axios from 'axios';
export async function fetchExistingData() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_RENDER_SERVER}/getPizzas`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Failed to fetch existing data from the server');
    }
  }