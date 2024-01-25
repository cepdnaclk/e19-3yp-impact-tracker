

export async function getAccessTokenFromRefreshToken(refreshToken: string): Promise<string> {
    try {
      const response = await fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const accessToken: string = data.accessToken;
        return accessToken;
      } else {
        throw new Error('Failed to get access token from refresh token');
      }
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }