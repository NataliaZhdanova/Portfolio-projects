import { getAuthToken } from '../utils/auth.js';
import { getUserId } from '../utils/userId.js';

const token = getAuthToken();
const userId = getUserId();

export const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:9000/companies/all/' + userId, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token, 
        }
      }); 
      const data = await response.json();
      return data
     } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };