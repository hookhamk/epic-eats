import Recipe from './../models/recipe.js';
import { Op } from 'sequelize';
import UserEats from './../models/userEats.js';

class Data {
  async findAll() {
    return await Recipe.findAll();
  }

  async findById(id: number) {
    return await Recipe.findByPk(id);
  }

  async findByTitle(title: string) {
    return await Recipe.findAll({
      where: {
        title: {
        [Op.iLike]: `%${title}%`,
        },
      },
    });
  }

  async createOrUpdate(details: any) {
    const ingredientsJson = details.extendedIngredients.map((ing: any) => ({
      id: ing.id,
      original: ing.original,
    }));

    const [dbEats] = await Recipe.findOrCreate({
      where: { id: details.id },
      defaults: {
        id: details.id,
        title: details.title,
        image_url: details.image,
        source_url: details.sourceUrl,
        summary: details.summary,
        instructions: details.instructions || 'Oh no! Instructions missing',
        ingredients: ingredientsJson,
      },
    });

    return dbEats;
  }

  async create(details: {
    id: number;
    title: string;
    image_url?: string;
    source_url?: string;
    summary?: string;
    instructions: string;
    ingredients: { id: number; original: string }[];
  }) {
    const recipe = await Recipe.create({
      id: details.id,
      title: details.title,
      image_url: details.image_url || '',
      source_url: details.source_url || '',
      summary: details.summary || '',
      instructions: details.instructions,
      ingredients: details.ingredients.map((ing) => ({
        id: ing.id,
        original: ing.original,
      })),
    });

    return recipe;
  }

  async createUserEat(details: {
    id?: number;
    title: string;
    image_url?: string;
    source_url?: string;
    summary?: string;
    instructions: string;
    ingredients: { id: number; original: string }[];
  }) {
    const userEat = await UserEats.create({
      title: details.title,
      image_url: details.image_url || '',
      source_url: details.source_url || '',
      summary: details.summary || '',
      instructions: details.instructions,
      ingredients: details.ingredients.map((ing) => ({
        id: ing.id,
        original: ing.original,
      })), 
    });
  
    return userEat;
  }

  async storeRecipesFromAPI(recipes: any[]) {
    for (const recipe of recipes) {
      await Recipe.findOrCreate({
        where: { id: recipe.id },
        defaults: {
          id: recipe.id,
          title: recipe.title,
          image_url: recipe.image,
          source_url: '',
          summary: '',
          instructions: recipe.instructions || 'Oh no! Instructions missing',
          ingredients: [],
        },
      });
    }
  }
}

export default new Data();
