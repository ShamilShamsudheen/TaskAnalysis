import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    dispatch(signup(formData, navigate));
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
        console.error('Google sign-up error:', data.message);
      }
    } catch (err) {
      console.error('Error during Google sign-up:', err);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google sign-up failed:', error);
  };

  return (
    <div className='w-full flex justify-center'>
      <div className='w-1/3 mt-3'>
        <h1 className='text-blue-600 font-extrabold text-4xl mt-2'>Sign Up</h1>
        <div className='mt-4 w-full border-4 font-semibold p-4 space-y-6 border-blue-600 rounded-xl'>
          <form className='space-y-4' onSubmit={onSubmit}>
            <input
              className='w-full p-2'
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={onChange}
            />
            <input
              className='w-full p-2'
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={onChange}
            />
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
            <input
              className='w-full p-2'
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
            />
            <button className='w-full bg-blue-600 p-2 text-white' type="submit">Sign Up</button>
          </form>
          <p className='w-full flex justify-center'>Already have an account? <Link className='text-blue-600' to='/login'>Login</Link></p>
          <div className='w-full flex justify-center mt-4'>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              logo="false" // Optional: Show or hide Google's logo
              style={{ width: '100%' }} // Optional: Adjust width if needed
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
