import { useState, useEffect } from "react";
import ErrorPage from "./ErrorPage";
import { retrieveSearchResults } from "../api/SearchAPI";
import PaginatedList from "../components/PaginatedList";
import { useOutletContext } from "react-router-dom";

const Search = () => {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const value: string = useOutletContext();

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setError(false);

            try {
                const data = await retrieveSearchResults(value);
                setRecipes(data);
            } catch (err) {
                console.error('Failed to retrieve recipes:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [value]);

    if (error) {
        return <ErrorPage />;
    }

    if (loading) {
        return <div>Searching for "{value}"...</div>;
    }

    return (
        <div className="search">
            <div>
            <h2>Search results for "{value}"</h2>
            <div className='eats-container'> 
                <PaginatedList items={recipes} />
            </div>
            </div>
        </div>
    );
};

export default Search;