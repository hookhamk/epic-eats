import { useState, useEffect } from "react";
import ErrorPage from "./ErrorPage";
import PaginatedList from "../components/PaginatedList";
import { fetchMyEatsFromDB } from "../api/MyEatsAPI";

const MyEats = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await fetchMyEatsFromDB();
        setRecipes(data);
      } catch (err) {
        console.error("Failed to retrieve saved recipes:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (error) {
    return <ErrorPage />;
  }

  if (loading) {
    return <div>Loading your saved eats...</div>;
  }

  return (
    <div>
      <h2>My Eats - Saved Recipes</h2>
      <button className='orange-button'>Add New Eat</button>
      <div className="eats-container">
        <PaginatedList items={recipes} />
      </div>
    </div>
  );
};

export default MyEats;
