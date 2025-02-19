import express from 'express';
import type { Request, Response } from 'express';
import { CompactRecipe } from '../../service/recipeService.js';
import RecipeSearchService from '../../service/recipeService.js';

const router = express.Router();

//Look at value of q and return array of compact recipes
router.get('/search/*', async (req: Request, res: Response) => {
    try {
        console.log(req.query.q)
        const searchArray: CompactRecipe[] = await RecipeSearchService.fetchSearchResults(req.query.q as string);
        
        res.json(searchArray);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/:id/information', async (req: Request, res: Response) =>{
    try{
        const fullInformation = await RecipeSearchService.fetchFullInformation(req.params.id);

        res.json(fullInformation);
    } catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/random', async (_req: Request, res: Response) =>{
    try{
        const randomInformation = await RecipeSearchService.fetchRandomRecipe();

        res.json(randomInformation);
    } catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/editor', async (_req: Request, res: Response) =>{
    try{
        const editorInformation = {
            "title": "Sausage and Egg Breakfast Burrito",
            "image": "https://img.spoonacular.com/recipes/1096058-556x370.jpg",
            "extendedIngredients": [
                {
                  "id": 7036,
                  "original": "1/4 lb of ground hot Italian sausage",
                },
                {
                  "id": 10611282,
                  "original": "1/4 cup of diced white onion",
                },
                {
                  "id": 11215,
                  "original": "3 cloves of garlic minced",
                },
                {
                  "id": 10311821,
                  "original": "3 mini sweet peppers julienned",
                },
                {
                  "id": 11979,
                  "original": "1/2 jalapeno diced",
                },
                {
                  "id": 1082047,
                  "original": "1/2 teaspoon of kosher salt",
                },
                {
                  "id": 2027,
                  "original": "1/2 teaspoon of oregano",
                },
                {
                  "id": 1002030,
                  "original": "fresh ground pepper to taste",
                },
                {
                  "id": 10218364,
                  "original": "1 large flour tortilla",
                },
                {
                  "id": 1123,
                  "original": "1 large egg",
                },
                {
                  "id": 1001,
                  "original": "1 tbsp butter",
                },
                {
                  "id": 1016168,
                  "original": "Sriracha to taste",
                }
              ],
              "instructions": "Heat a pan to medium to high heat and add the sausage, diced onion, minced garlic, and julienned mini peppers. Break up sausage into small pieces as you cook it and the veggies, stirring often. After about 5 minutes, add the salt, oregano, and pepper and continue cooking for another 10-12 minutes until the sausage is completely cooked. In a separate small pan, heat to medium and add butter. Melt butter until it begins to sizzle a little add the egg. Let the egg cook, untouched for a couple of minutes. As the outside of the egg whites begins to set, cover the pan to let the top of the whites cook (by steaming the egg a bit), but keeping a nice runny yolk, 5-7 minutes. Lay tortilla flat and add sausage mixture. Top with the fried egg and sriracha. Wrap it up and dig in!",
        }

        res.json(editorInformation);
    } catch(err){
        console.error(err);
        res.status(500).json(err);
    }

});


export { router as recipeRouter };
