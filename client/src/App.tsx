import { Outlet } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css'; // v5 reset styles
import './App.less';
import Footer from './components/Footer'
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
    <ConfigProvider
    theme={{
      token: {
        //Seed Token for primary styling
        colorPrimary: '#faf3e0',
        borderRadius: 12,
        colorText: '#3e2723',
        fontSize: 16,
        colorBgContainer: '#a4825f',
      },
    }}    
    >
      <Navbar />
      <main className='container pt-5'>
        <Outlet />
      </main>
      <Footer />
      </ConfigProvider>
    </div>
  );
}

export default App;
