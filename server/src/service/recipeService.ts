import dotenv from 'dotenv'
dotenv.config();

export class CompactRecipe {
    id: number;
    title: string;
    image: string;

    constructor(
        id: number,
        title: string,
        image: string,

    ) {
        this.id = id;
        this.title = title;
        this.image = image;
    }
}

class RecipeSearchService {
    private baseURL?: string;
    private apiKey?: string;

    async fetchSearchResults(searchQuery: string) {
        const parsedQuery = searchQuery.replace(/\s/g, '_');

        const searchResponse = await fetch(`${this.baseURL}/recipes/complexSearch?query=${parsedQuery}&apiKey=${this.apiKey}`);
        const parsedSearchResponse = await searchResponse.json();

        const searchArray: CompactRecipe[] = [];

        for (let i = 0; i < parsedSearchResponse.results.length; i++) {
            const individualResult = new CompactRecipe(parsedSearchResponse.results[i].id, parsedSearchResponse.results[i].title, parsedSearchResponse.results[i].image);
            searchArray.push(individualResult);
        }

        return searchArray;
    }

}

export default new RecipeSearchService();
