import { Outlet } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css'; // Ant Design v5 reset styles
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
        colorPrimary: '@color-off-white',
        borderRadius: 12,
        colorText: '@color-dark-brown',
        fontSize: 16,
        colorBgContainer: '@color-dark-tan',
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
