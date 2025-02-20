import axios from 'axios';

const RecipeAPI = {
  createRecipe: async (recipeData: {
    title: string;
    image_url: string;
    source_url: string;
    summary: string;
    instructions: string;
    ingredients: object[];
  }) => {
    const response = await axios.post('/api/myeats', recipeData);
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