import axios from 'axios';

const RecipeAPI = {
  createRecipe: async (recipeData: {
    id?: number;
    title: string;
    image_url?: string;
    source_url?: string;
    summary?: string;
    instructions: string;
    ingredients: object[];
  }) => {
    try {
      let payload = recipeData;
      // Remove `id` if it's null, undefined, or irrelevant (e.g., user-created recipe)
      if (!recipeData.id) {
        const { id, ...dataWithoutId } = recipeData;
        payload = dataWithoutId;
      }

    const response = await axios.post('/api/recipe/neweat', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }},

  retrieveRecipeDetails: async (id: string) => {
    try {
      const response = await fetch(
        `/recipes/${id}/information`,
      );
      // destructure response.  api call returns object with 1 key (results), whose value is the array of objects(recipes) we are inteerested in.
      const result = await response.json();
  
      if(!response.ok) {
        throw new Error('invalid API response, check network tab!');
      }
  
      return result;
    } catch (err) {
      console.log('Error from data retrieval: ', err);
      return Promise.reject('Could not relay search term to server');
    }
  },
  };

  export default RecipeAPI;