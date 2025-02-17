import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { login } from '../api/authAPI';
import type { UserLogin } from '../interfaces/UserLogin';

const Login = (_props:any) => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  // return (
  //   <div className='form-container'>
  //     <Form className='form login-form' 
  //       onSubmit={handleSubmit}
  //       name="login"
  //       initialValues={{ remember: true }}
  //       style={{ maxWidth: 360 }}
  //     >
  //       <Form.Item className='form-group'
  //         rules={[{ required: true, message: 'Please input your Username!' }]}
  //       >
  //         <Input
  //           prefix={<UserOutlined />} 
  //           placeholder="Username"
  //           name="username"
  //           value={loginData.username || ''}
  //           onChange={handleChange}
  //         />
  //       </Form.Item>
  //       <Form.Item className='form-group'
  //         rules={[{ required: true, message: 'Please input your Password!' }]}
  //       >
  //         <Input
  //           prefix={<LockOutlined />} type="password" placeholder="Password" name="password"
  //           value={loginData.password || ''}
  //           onChange={handleChange}
  //         />
  //       </Form.Item>
  //       <Form.Item className='form-group'>
  //         <Flex justify="space-between" align="center">
  //           <Form.Item name="remember" valuePropName="checked" noStyle>
  //             <Checkbox>Remember me</Checkbox>
  //           </Form.Item>
  //             <a href="">Forgot password</a>
  //           </Flex>
  //       </Form.Item>
  //       <Form.Item>
  //         <Button block type="primary" htmlType="submit">
  //           Log in
  //         </Button>
  //           or <Link to='/signup'>Register Now!</Link>
  //       </Form.Item>
  //     </Form>
  //   </div>
  // );
  return (
    <div className='form-container'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='form-group'>
          <input
            placeholder="Username"
            className='form-input'
            type='text'
            name='username'
            value={loginData.username || ''}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <input
            className='form-input'
            placeholder="Password"
            type='password'
            name='password'
            value={loginData.password || ''}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-primary' type='submit'>
            Login
          </button>
          or <Link to='/signup'> Register Now!</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
