export const fetchMyEatsFromDB = async (): Promise<any[]> => {
    const response = await fetch(`/api/user-eats`);
    if (!response.ok) {
      throw new Error('Failed to fetch saved recipes');
    }
    return response.json();
  };

export default {fetchMyEatsFromDB};
  