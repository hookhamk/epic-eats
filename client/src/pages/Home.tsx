import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import ErrorPage from "./ErrorPage";
import type { UserData } from "../interfaces/UserData";
import { retrieveRandomRecipe } from "../api/RandomRecipeAPI";
import { retrieveEditorsRecipe } from "../api/EditorsRecipeAPI";
import auth from '../utils/auth';
import kelly from '../../assets/images/kelly.jpg';
import gage from '../../assets/images/gage.jpg';
import nick from '../../assets/images/nick.png';

interface Recipe {
    image: string,
    title: string,
    extendedIngredients: Ingredients[],
    instructions: string;
}

interface Ingredients {
    id: number,
    original: string;
}

const Home = (_props: any) => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [randomRecipe, setRandomRecipe] = useState<Recipe>({
        image: '',
        title: '',
        extendedIngredients: [],
        instructions: ''
    })
    const [editorRecipe, setEditorRecipe] = useState<Recipe>({
        image: '',
        title: '',
        extendedIngredients: [],
        instructions: ''
    })
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        if (loginCheck) {
            fetchUsers();
        }
    }, [loginCheck]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data)
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    }

    if (error) {
        return <ErrorPage />;
    }

    useEffect(() => {
        fetchRandomRecipe()
    }, [])

    // onclick call fetch random recipe

    const fetchRandomRecipe = async () => {
        try {
            const data = await retrieveRandomRecipe()
            setRandomRecipe(data)
        } catch (err) {
            console.error('Failed to retrieve Random Recipe', err);
            setError(true);
        }
    }

    useEffect(() => {
        fetchEditorsRecipe()
    }, [])

    // onclick call fetch random recipe

    const fetchEditorsRecipe = async () => {
        try {
            const data = await retrieveEditorsRecipe()
            setEditorRecipe(data)
        } catch (err) {
            console.error("Failed to retrieve Editor's Eats", err);
            setError(true);
        }
    }

    return (
        <>
            <section>
                <div>
                    <h3>Try this Epic Eat:</h3>
                    <h1>{randomRecipe.title}</h1>
                    <button onClick={() => fetchRandomRecipe()}>Get another Epic Eat</button>
                    <img src={randomRecipe.image}></img>
                </div>
                <div>
                    <h2>Ingredients</h2>
                    <ul>
                        {randomRecipe.extendedIngredients.map(item => (
                            <li key={item.id}>{item.original}</li>
                        ))}
                    </ul>
                    <p>{randomRecipe.instructions}</p>
                </div>
            </section>

            <section>
                <div>
                    <h3>Try this Editor's Eats:</h3>
                    <h1>{editorRecipe.title}</h1>
                    <img src={editorRecipe.image}></img>
                </div>
                <div>
                    <h2>Ingredients</h2>
                    <ul>
                        {editorRecipe.extendedIngredients.map(item => (
                            <li key={item.id}>{item.original}</li>
                        ))}
                    </ul>
                    <p>{editorRecipe.instructions}</p>
                </div>
            </section>

            <section>
                <div>
                    <h2>Meet our Team!</h2>
                    <div>
                    <h2>Design and Database</h2>
                        <img src={kelly}></img>
                        <p>Kelly</p>
                    </div>
                    <div>
                    <h2>Backend Development</h2>
                        <img src={nick}></img>
                        <p>Nick</p>
                    </div>
                    <div>
                    <h2>Front End Development</h2>
                        <img src={gage}></img>
                        <p>Gage</p>
                    </div>
                </div>
                <div>
                    <h2>Like our content? Subscribe to our Newsletter!</h2>
                    <button>Newsletter</button>
                </div>
            </section>
        </>
    );
}

export default Home;