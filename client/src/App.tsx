// import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useState } from 'react';
import SignUp from './pages/SignUp';
import Search from './pages/Search';
import MyCookbook from './pages/MyCookbook';
import Recipe from './pages/Recipe';
import Login from './pages/Login';
import Home from './pages/Home';
function App() {

  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div>
      {/* <SearchContext.Provider value={{searchTerm, setSearchTerm}}> */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <main className='container pt-5'>
        <SignUp/>
        <Search searchTerm={searchTerm}/>
        <MyCookbook />
        <Recipe />
        <Login />
        <Home />
      </main>
      {/* </SearchContext.Provider> */}
    </div>
  );
}

export default App;
