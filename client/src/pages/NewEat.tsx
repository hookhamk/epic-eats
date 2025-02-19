import { useState, type FormEvent, type ChangeEvent } from 'react';
import RecipeAPI from '../api/RecipeAPI';

const NewEat = () => {
  const [recipeData, setRecipeData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    imageUrl: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await RecipeAPI.createRecipe(recipeData);
      alert('Recipe successfully created!');
      setRecipeData({
        title: '',
        ingredients: '',
        instructions: '',
        imageUrl: '',
      });
    } catch (err) {
      console.error('Failed to create recipe', err);
      alert('Failed to create recipe');
    }
  };

  return (
    <div className='form-container'>
      <form className='form recipe-form' onSubmit={handleSubmit}>
        <h1>Create New Recipe</h1>
        <div className='form-group'>
          <input
            placeholder='Title'
            className='form-input'
            type='text'
            name='title'
            value={recipeData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <textarea
            placeholder='Ingredients (comma-separated)'
            className='form-input'
            name='ingredients'
            value={recipeData.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <textarea
            placeholder='Instructions'
            className='form-input'
            name='instructions'
            value={recipeData.instructions}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            placeholder='Image URL'
            className='form-input'
            type='text'
            name='imageUrl'
            value={recipeData.imageUrl}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-primary' type='submit'>
            Save Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEat;
