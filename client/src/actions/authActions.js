import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const signup = (userData, navigate) => async (dispatch) => {
    
  try {
    const res = await axios.post(`${BASE_URL}/auth/signup`, userData);
    dispatch({ 
      type: 'SIGNUP_SUCCESS', 
      payload: { 
        token: res.data.token,
        user: res.data.user
      } 
    });
    navigate('/');
  } catch (err) {
    dispatch({ type: 'SIGNUP_FAIL', payload: err.response.data.message });
  }
};

export const login = (userData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, userData);
    dispatch({ 
      type: 'LOGIN_SUCCESS', 
      payload: { 
        token: res.data.token,
        user: res.data.user // Include user data
      } 
    });
    navigate('/');
  } catch (err) {
    dispatch({ type: 'LOGIN_FAIL', payload: err.response.data.message });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
};
