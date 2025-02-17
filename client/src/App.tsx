import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {

  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div>
      {/* <SearchContext.Provider value={{searchTerm, setSearchTerm}}> */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <main className='container pt-5'>
        <Outlet />
      </main>
      {/* </SearchContext.Provider> */}
    </div>
  );
}

export default App;
