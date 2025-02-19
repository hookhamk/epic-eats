import axios from 'axios';

const RecipeAPI = {
  createRecipe: async (recipeData: {
    title: string;
    ingredients: string;
    instructions: string;
    imageUrl: string;
  }) => {
    const response = await axios.post('/api/saved_recipes', recipeData);
    return response.data;
  },

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