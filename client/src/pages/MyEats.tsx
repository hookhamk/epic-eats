import { useState, useEffect } from "react";
import PaginatedList from "../components/PaginatedList";
import { fetchMyEatsFromDB } from "../api/MyEatsAPI";
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const MyEats = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = auth.getToken();

  if (!userId) {
    window.location.replace('/login');
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(false);

      try {
        const userId = localStorage.getItem('userId');
        const data = await fetchMyEatsFromDB(Number(userId));
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

  return (
    <div>
      <h2>My Eats - Saved Recipes</h2>
      <Link to='/NewEat'>
        <button className='save-recipe-btn'>Add New Eat</button>
      </Link>
      <div className="eats-container">
        {loading && <p>Loading your saved eats...</p>}
        {error && <p className="error-message">Failed to retrieve saved recipes. Please try again later.</p>}
        {!loading && !error && recipes.length > 0 && <PaginatedList items={recipes} />}
        {!loading && !error && recipes.length === 0 && <p>No saved recipes found.</p>}
      </div>
    </div>
  );
};

export default MyEats;
