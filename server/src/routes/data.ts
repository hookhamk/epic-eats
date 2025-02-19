import Recipe from './../models/recipe.js';
import { Op } from 'sequelize';

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
      name: ing.name,
      amount: ing.amount,
      unit: ing.unit,
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
