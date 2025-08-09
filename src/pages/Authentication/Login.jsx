import React, { use } from 'react';
import Lottie from "lottie-react";
import loginLottie from "../../assets/register.json"
import Swal from 'sweetalert2';

import { NavLink, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../providers/AuthContext';
import SocialLogin from './SocialLogin';

const Login = () => {
  const {signInUser} = use(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'
  const handleSignIn = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email,password)
    .then(() => {
      Swal.fire('Success', 'Successfully logged in!', 'success').then(() => {
        navigate(from)
      });
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        Swal.fire('Error', 'User not found', 'error');
      } else {
        Swal.fire('Error', error.message, 'error');
      }
    })
  }


    return (
<div className="hero bg-base-100 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <Lottie animationData={loginLottie} loop={true}></Lottie>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSignIn}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" name='email' />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" name='password' />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
          <p className='text-xs'>Dont have an account? <span className='font-bold'><NavLink to='/register'>Register</NavLink></span></p>
        </fieldset>
        </form>
        <SocialLogin from={from}></SocialLogin>
      </div>
    </div>
  </div>
</div>
    );
};

export default Login;