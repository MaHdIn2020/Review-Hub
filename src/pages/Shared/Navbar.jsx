import React, { useContext } from 'react';
import { FaGrinStars } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../providers/AuthContext';
import { ThemeContext } from '../../providers/ThemeContext';

const Navbar = () => {
  const { user, signOutUser } = React.useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser()
      .then(() => navigate('/'))
      .catch(error => console.log(error));
  };

  const navLinks = (
    <>
      <NavLink to="/" className="hover:text-primary"><li><a>Home</a></li></NavLink>
      <NavLink to="/all-services" className="hover:text-primary"><li><a>Services</a></li></NavLink>
      {user && (
        <>
          <NavLink to="/addservice" className="hover:text-primary"><li><a>Add Service</a></li></NavLink>
          <NavLink to="/my-service" className="hover:text-primary"><li><a>My Services</a></li></NavLink>
          <NavLink to="/my-reviews" className="hover:text-primary"><li><a>My Reviews</a></li></NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="w-full bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white dark:bg-gray-900 rounded-box w-52">
              {navLinks}
            </ul>
          </div>
          <NavLink to="/" className="btn btn-ghost normal-case text-xl font-bold text-primary dark:text-blue-300 flex items-center gap-2">
             ReviewHub
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-primary dark:text-blue-300">{navLinks}</ul>
        </div>

        <div className="navbar-end gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            aria-label="Toggle Theme"
            title="Toggle light/dark mode"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full overflow-hidden">
                    <img alt="User Avatar" src={user.photoURL} />
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white dark:bg-gray-900 rounded-box mt-3 w-52 p-2 shadow text-primary dark:text-blue-300">
                  <li><a>{user.displayName}</a></li>
                </ul>
              </div>
              <button className="btn btn-primary" onClick={handleSignOut}>Sign Out</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-primary">Login</NavLink>
              <NavLink to="/register" className="btn btn-outline btn-primary">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
