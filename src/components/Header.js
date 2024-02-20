import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/logo.svg';
import { control } from '../App';

const Header = ({ isLog }) => {
  // const { userFound } = useContext(control);

  return (
    <header className='py-6 mb-12 border-b'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* logo */}
        <Link to='/'>
          <img className='flex flex-row' src={Logo} alt='' />
        </Link>
        {/* buttons */}
        <div className='flex items-center gap-6'>
          {isLog ? (
            <>
              <Link className='hover:text-violet-900 transition' to='/logout'>
                Logout
              </Link>
              <Link className='hover:text-violet-900 transition' to='/profile'>
                <span role="img" aria-label="User Symbol">🕵🏼</span> Profile
              </Link>
              {/* Add Cart icon when user is logged in */}
              <Link className='hover:text-violet-900 transition' to='/cart'>
                🛒 Cart
              </Link>
              

            </>
          ) : (
            <>
              <Link className='hover:text-violet-900 transition' to='/login'>
                Login
              </Link>
              <Link
                className='bg-green-700 hover:bg-yellow-800 text-white px-4 py-3 rounded-lg transition'
                to='/register'
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
