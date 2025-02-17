import { Outlet } from 'react-router-dom';
import 'antd/dist/reset.css'; // Ant Design v5 reset styles
import './App.less';
import theme from './../assets/theme';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {

  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <main className='container pt-5'>
        <Outlet />
      </main>
    <Footer />
     {/* </SearchContext.Provider> */}
    </div>
  );
}

export default App;
