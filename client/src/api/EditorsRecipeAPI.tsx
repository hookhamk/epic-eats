const retrieveEditorsRecipe = async () => {
    try {
      const response = await fetch(
        `/api/recipe/editor`,
      );

      const result = await response.json();
  
      if(!response.ok) {
        throw new Error('invalid API response, check network tab!');
      }
  
      return result;
    } catch (err) {
      console.log('Error from data retrieval: ', err);
      return Promise.reject('Could not relay editor request to server');
    }
  };

  export {retrieveEditorsRecipe};