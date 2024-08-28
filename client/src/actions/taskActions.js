import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getTasks = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/tasks`, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    dispatch({ type: 'GET_TASKS', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const addTask = (task) => async (dispatch) => {
    console.log(task,'task');
    
  try {
    const res = await axios.post(`${BASE_URL}/tasks`, task, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    dispatch({ type: 'ADD_TASK', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const editTask = (id, task) => async (dispatch) => {
  try {
    const res = await axios.put(`${BASE_URL}/tasks/${id}`, task, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    dispatch({ type: 'EDIT_TASK', payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/tasks/${id}`, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    dispatch({ type: 'DELETE_TASK', payload: id });
  } catch (err) {
    console.error(err);
  }
};
