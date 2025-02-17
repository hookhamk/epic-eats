import { useState, useEffect } from "react";
import ErrorPage from "./ErrorPage";
import { retrieveSearchResults } from "../api/SearchAPI";
import PaginatedList from "../components/PaginatedList";

const params = new URLSearchParams(window.location.search);
const searchTerm = params.get('q');

const Search = () => {
    const [recipes, setRecipes] = useState([])
    const [error, setError] = useState(false);

    useEffect (() => {
        fetchSearchResults()
    },[])

    const fetchSearchResults = async () => {
        try {
            const data = await retrieveSearchResults(searchTerm as string);
            setRecipes(data);
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    }

    if (error) {
        return <ErrorPage />;
    }

    return (
        <div className="search">
            <h2>Search results for {searchTerm}</h2>
            <PaginatedList items={recipes}/>
        </div>
    );
}

export default Search;