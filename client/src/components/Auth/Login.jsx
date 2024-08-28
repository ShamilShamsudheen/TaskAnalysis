import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }, navigate));
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
      });
      const data = await res.json();
      
      if (res.ok) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        navigate('/');
      } else {
        console.error('Google login error:', data.message);
      }
    } catch (err) {
      console.error('Error during Google login:', err);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google login failed:', error);
  };

  return (
    <div className='w-full flex justify-center'>
      <div className='w-1/3 mt-3'>
        <h1 className='text-blue-600 font-extrabold text-4xl mt-2'>Login</h1>
        <div className='mt-4 w-full border-4 font-semibold p-4 space-y-6 border-blue-600 rounded-xl'>
          <form className='space-y-4' onSubmit={onSubmit}>
            <input
              className='w-full p-2'
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
            />
            <input
              className='w-full p-2'
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />
            <button className='w-full bg-blue-600 p-2 text-white' type="submit">Login</button>
          </form>
          <p className='w-full flex justify-center'>Don't have an account? <Link className='text-blue-600' to='/signup'>Signup</Link></p>
          <div className='w-full flex justify-center'>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              logo="false" 
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
