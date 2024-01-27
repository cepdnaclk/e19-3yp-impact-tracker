import { BASE_URL } from "../config/config";


export async function renewAccessToken(){
    try {
      const response = await fetch(`${BASE_URL}/auth`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,

        },
      });
  
      if (response.ok) {
        const data = await response.json();
        const accessToken: string = data.accessToken;
        console.log("Renewed access token: ", accessToken); 
        localStorage.setItem('accessToken', accessToken);

      } else {
        throw new Error('Failed to get access token from refresh token');
      }
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }