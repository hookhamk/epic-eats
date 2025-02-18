import { useState, useEffect } from "react";
import ErrorPage from "./ErrorPage";
import { retrieveSearchResults } from "../api/SearchAPI";
import PaginatedList from "../components/PaginatedList";
import { useOutletContext } from "react-router-dom";


// const searchTerm = params.get('q');

const Search = () => {
    const [recipes, setRecipes] = useState([])
    const [error, setError] = useState(false);
    const value:string = useOutletContext();

    useEffect (() => {
        fetchSearchResults()
    },[])

    const fetchSearchResults = async () => {
        try {
            const data = await retrieveSearchResults(value as string);
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
            <h2>Search results for {value}</h2>
            <PaginatedList items={recipes}/>
        </div>
    );
}

export default Search;