import { RecipeData } from '../interfaces/RecipeData';
import { useState, useEffect } from "react";


  const fetchMyEatsFromDB = async () => {
    try {
      const response = await fetch(`/api/recipe/myeats`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error('Failed to fetch saved recipes');
      }
      return result;
    } catch (err) {
      console.log('Error from data retrieval: ', err);
      return Promise.reject('Could not relay request to server');
    }
  };

  const useSaveRecipeToDB = () => {
    const [saveMessage, setSaveMessage] = useState<string | null>(null);
    const [nextId, setNextId] = useState<number>(1); // Default to 1

    // Fetch recipes on mount and determine next available ID
    useEffect(() => {
      const getNextId = async () => {
        const savedRecipes = await fetchMyEatsFromDB();
        const maxId = savedRecipes.reduce((max: any, recipe: any) => Math.max(max, recipe.id), 0);
        setNextId(maxId + 1);
      };

      getNextId();
    }, []);

    const saveRecipeToDB = async (body: RecipeData) => {
     try {
        const response = await fetch('/api/recipe/neweat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: nextId,
            title: body.title,
            image_url: body.image_url,
            source_url: body.source_url || '',
            summary: body.summary || '',
            instructions: body.instructions,
            ingredients: body.ingredients.map((ing) => ing.original),
          }),
        });

        if (!response.ok) throw new Error('Failed to save recipe');

        setSaveMessage('Recipe Saved Successfully!');
        setNextId((prevId) => prevId + 1);
      } catch (err) {
        setSaveMessage('Error saving recipe.');
      }
    };
      return { saveMessage, saveRecipeToDB };
    };

export { fetchMyEatsFromDB, useSaveRecipeToDB };
