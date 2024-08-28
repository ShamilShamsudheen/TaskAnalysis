import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    alert('do you want logout? ');
    dispatch(logout());
  };

  return (
    <nav className='bg-blue-500 w-full text-white flex justify-center h-20 items-center'>
      <div className='w-11/12 flex justify-between'>

      <Link to="/"><FontAwesomeIcon icon={faClipboardList} size="2x" /></Link>
      <ul className='flex justify-evenly'>
        {auth.isAuthenticated ? (
          <button className='bg-red-400 p-2 rounded font-semibold text-white' onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button><Link className='' to="/login">Login</Link></button>
            <button><Link className='' to="/signup">Sign Up</Link></button>
          </>
        )}
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;
