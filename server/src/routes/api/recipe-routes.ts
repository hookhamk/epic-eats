import express from 'express';
import type { Request, Response } from 'express';
import { CompactRecipe } from '../../service/recipeService.js';
import RecipeSearchService from '../../service/recipeService.js';

const router = express.Router();

//Look at value of q and return array of compact recipes
router.get('/search/*', async (req: Request, res: Response)=>{
    try{
        console.log(req.query.q)
        const searchArray: CompactRecipe[] = await RecipeSearchService.fetchSearchResults(req.query.q as string);



        res.json(searchArray);
    } catch(err){
        console.error(err);
        res.status(500).json(err);
    }

});


export {router as recipeRouter};
