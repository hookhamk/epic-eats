import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import auth from '../utils/auth';
import sampleLogo from '../../assets/images/ee_logo.png';
//import { Flex, Typography, Col, Row } from 'antd';
//import { SearchOutlined } from '@ant-design/icons';
import userIcon from '../../assets/images/user-icon.png';
import './../App.less';

const Navbar = (props: any) => {
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
    navigate("/search/?q=" + props.searchTerm)
    //
  }

  const handleChange = ( // updated from login example
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    return props.setSearchTerm(value);
  };

  return (
    <div className='custom-navbar'>
      <div className='logo-title'>
      <img className='logo' src={sampleLogo}></img>
      <h1>Epic Eats</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search for an Epic Eat" onChange={handleChange}></input>
        <button type="submit">Eat</button>
      </form>
      <div>
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
            </>
          )}
          <img className='logo' src={userIcon}></img>
        </div>
        <div>
          <button className='btn' type='button'>
            <Link to='/myEats'>My Eats</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
