import { useState, useEffect } from "react";
import { retrieveRecipeDetails } from "../api/RecipeDetailsAPI";
import ErrorPage from "./ErrorPage";
import { useParams } from 'react-router-dom';

interface Recipe {
    image: string,
    title: string,
    extendedIngredients: Ingredients[],
    instructions: string;
}

interface Ingredients {
    id: number,
    original: string;
}

const Recipe = (_props: any) => {

    const { id } = useParams();
    console.log(id)
    const [error, setError] = useState(false);
    const [recipe, setRecipe] = useState<Recipe>({
        image: '',
        title: '',
        extendedIngredients: [],
        instructions: ''
    })

    const [saveMessage, setSaveMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchRecipeDetails()
    }, [])

    const fetchRecipeDetails = async () => {
        try {
            const data = await retrieveRecipeDetails(id!)
            setRecipe(data)
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    }

  const saveRecipeToDB = async () => {
    try {
      const response = await fetch('/api/myeats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: Number(id),
          title: recipe.title,
          image_url: recipe.image,
          instructions: recipe.instructions,
          ingredients: recipe.extendedIngredients.map((ing) => ing.original),
        }),
      });

      if (!response.ok) throw new Error('Failed to save recipe');

      setSaveMessage('Recipe Saved Successfully!');
    } catch (err) {
      console.error('Error saving recipe:', err);
      setSaveMessage('Failed to save recipe.');
    }
  };

    if (error) {
        return <ErrorPage />
    }

    return (<div className="recipe">
        <div className='eats-container'>
            <div className='recipe-card'>
                <h1>{recipe.title}</h1>
                <h2>Ingredients</h2>
                <ul>
                    {recipe.extendedIngredients.map(item => (
                        <li key={item.id}>{item.original}</li>
                    ))}
                </ul>
                <p>{recipe.instructions}</p>
                <button onClick={saveRecipeToDB}>Save Recipe</button>
                {saveMessage && <p>{saveMessage}</p>}
            </div>
            <div className='recipe-img'>
                <img src={recipe.image} alt={recipe.title}></img>
            </div>
        </div>
    </div>);
}

export default Recipe;