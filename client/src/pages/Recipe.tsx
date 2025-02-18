import { useState, useEffect } from "react";
import { retrieveRecipeDetails } from "../api/RecipeDetailsAPI";
import ErrorPage from "./ErrorPage";
import {useParams} from 'react-router-dom';

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

const Recipe = (_props:any) => {
  
    const {id} = useParams();
    console.log(id)
    const [error, setError] = useState(false);
    const [recipe, setRecipe] = useState<Recipe>({
        image: '',
        title: '',
        extendedIngredients: [],
        instructions: ''
    })

    useEffect (() => {
        fetchRecipeDetails()
    },[])

    const fetchRecipeDetails = async () => {
        try {
            const data = await retrieveRecipeDetails(id!)
            setRecipe(data)
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    }

    if (error) {
        return <ErrorPage />
    }

    return (<div className="recipe">
        <div>
            <h1>{recipe.title}</h1>
            <img src={recipe.image}></img>
            <h2>Ingredients</h2>
            <ul>
            {recipe.extendedIngredients.map(item => (
                <li key={item.id}>{item.original}</li>
            ))}
            </ul>
            <p>{recipe.instructions}</p>
        </div>
    </div>);
}

export default Recipe;