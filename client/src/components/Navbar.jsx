import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faClipboardList } from '@fortawesome/free-solid-svg-icons';

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
            <div className='flex justify-center items-center space-x-2'>

              <button className='bg-red-400 p-2 rounded font-semibold text-white' onClick={handleLogout}>Logout</button>
              <Link to="/profile"><FontAwesomeIcon icon={faAddressCard} size='2x' /></Link>

            </div>
          ) : (
            <>
              <button><Link className='bg-blue-400 p-2 rounded font-semibold text-white' to="/login">Login</Link></button>
              <button><Link className='bg-blue-400 p-2 rounded font-semibold ml-2 text-white' to="/signup">Sign Up</Link></button>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
