import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import auth from '../utils/auth';
import sampleLogo from "../../assets/images/sample-logo.png"

const Navbar = (props:any) => {
  const [loginCheck, setLoginCheck] = useState(false);
  //const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  const handleSubmit = async (e: FormEvent) => {
    // grabs state passes to navigate. input needs to be state.
    e.preventDefault();
    navigate("/search/?q="+props.searchTerm)
    //
  }

  const handleChange = ( // updated from login example
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    return props.setSearchTerm(value);
  };

  return (
    <div className='display-flex justify-space-between align-center py-2 px-5 mint-green'>
      <h1>Epic Eats</h1>
      <img src={sampleLogo} height={300}></img>
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Search for an Epic Eat" onChange={handleChange}></input>
      <button type="submit">Eat</button>
      </form>
      <div>
        {!loginCheck ? (
          <>
          <button className='btn' type='button'>
            <Link to='/login'>Login</Link>
          </button>
          {/* <button className='btn' type='button'>
          <Link to='/signUp'>Sign Up</Link>
          </button> */}
          </>
        ) : (
            <>
              <button
                className='btn'
                type='button'
                onClick={() => {
                  auth.logout();
                }}>Logout
              </button>
              <button className='btn' type='button'>
                <Link to='/myEats'>My Eats</Link>
              </button>
            </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
