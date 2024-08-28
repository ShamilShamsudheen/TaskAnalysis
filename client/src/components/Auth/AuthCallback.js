// components/Auth/AuthCallback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      // Extract token from URL (assuming it's passed as a query parameter)
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        // Store the token and handle successful login
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        // Handle error or redirect to login if no token
        navigate('/login');
      }
    };

    fetchToken();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;
