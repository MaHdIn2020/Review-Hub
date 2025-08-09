import React, { use } from 'react';

import { FaGrinStars } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../providers/AuthContext';
const Navbar = () => {
  const {user,signOutUser} = use(AuthContext)
  const navigate = useNavigate()
  console.log(user)

  const hnadleSignOut = () => {
    signOutUser()
    .then(()=>{
      console.log('sign out')
      navigate('/')
    }).catch(error=>{
      console.log(error)
    })
  }
    return (
        <div>

            <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <NavLink to={'/'}><li><a>Home</a></li></NavLink>
    {user ? <>
    <NavLink to='/all-services'><li><a>Services</a></li></NavLink>
    <NavLink to='/addservice'><li><a>Add Service</a></li></NavLink>
        <NavLink to='/my-service'><li><a>My Services</a></li></NavLink>
        <NavLink to='/my-reviews'><li><a>My Reviews</a></li></NavLink>
    </> : <NavLink to='/all-services'><li><a>Services</a></li></NavLink> }
      </ul>
    </div>
    <NavLink to='/'> <a className="btn btn-ghost text-xl font-bold"><FaGrinStars /> ReviewHub</a> </NavLink>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {user ? <>
    <NavLink to='/all-services'><li><a>Services</a></li></NavLink>
    <NavLink to='/addservice'><li><a>Add Service</a></li></NavLink>
        <NavLink to='/my-service'><li><a>My Services</a></li></NavLink>
        <NavLink to='/my-reviews'><li><a>My Reviews</a></li></NavLink>
    </> : <NavLink to='/all-services'><li><a>Services</a></li></NavLink> }
    </ul>

  </div>
  <div className="navbar-end gap-3">
    {
      user ? 
      <>
          <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoURL} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>{user.displayName}</a></li>
      </ul>
    </div>
    <button className='btn' onClick={hnadleSignOut}>Sign Out</button>
      </>
       :
      <>
    <NavLink to='/login'><a className="btn">Login</a></NavLink>
    <NavLink to='/register'><a className="btn">Register</a></NavLink>
      </>
    }
  </div>
</div>
            
        </div>
    );
};

export default Navbar;