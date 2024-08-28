// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import TaskList from './components/Task/TaskList';
import PrivateRoute from './components/PrivateRoute';
import AuthCallback from './components/Auth/AuthCallback';
import UserProfile from './components/Profile';

const App = () => {
  
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/google/callback" element={<AuthCallback />} />
          <Route
            path="/"
            element={<PrivateRoute element={<TaskList />} />}
          />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
