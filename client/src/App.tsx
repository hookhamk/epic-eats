import { Outlet } from 'react-router-dom';
import 'antd/dist/reset.css'; // Ant Design v5 reset styles
import './App.less';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {

  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='layout'>
      <header>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </header>
      <main className='content'>
        <Outlet context={searchTerm} />
      </main>
      <footer>
    <Footer />
    </footer>
     {/* </SearchContext.Provider> */}
    </div>
  );
}

export default App;
