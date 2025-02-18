import express from 'express';
import type { Request, Response } from 'express';
import { CompactRecipe } from '../../service/recipeService.js';
import RecipeSearchService from '../../service/recipeService.js';
import Data from '../data.js';

const router = express.Router();

//Look at value of q and return array of compact recipes
router.get('/search/*', async (req: Request, res: Response) => {
    try {
        const query = req.query.q as string;
        console.log(`Search Query: ${query}`);

        //check database for search result before making api call
        const dbEats = await Data.findByTitle(query);

        if (dbEats.length >= 20) {
            const searchArray: CompactRecipe[] = dbEats.map((recipe) => ({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image_url,
            }));
            console.log('Returning results from DB')
            return res.json(searchArray);
        }
       //if no or not engough results are found call Spoonacular API
       console.log('Not enough results in DB. Calling Spoonacular API...');
        const searchArray: CompactRecipe[] = await RecipeSearchService.fetchSearchResults(query);
        
        //store results to DB
        await Data.storeRecipesFromAPI(searchArray);
        return res.json(searchArray);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
        return;
    }
});

router.get('/:id/information', async (req: Request, res: Response) =>{
    try{
        const recipeId = parseInt(req.params.id);

        // Check DB first
        const dbEats= await Data.findById(recipeId);
        if (dbEats) {
            return res.json(dbEats);
        }

        const fullInformation = await RecipeSearchService.fetchFullInformation(req.params.id);

        return res.json(fullInformation);

    } catch(err){
        console.error(err);
        res.status(500).json(err);
        return;
    }
});

export { router as recipeRouter };
