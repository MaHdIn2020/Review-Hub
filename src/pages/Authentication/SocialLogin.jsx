import React, { use } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router';
const SocialLogin = ({from}) => {
const {signInWithGoogle} = use(AuthContext)
const navigate = useNavigate()
const handleGoogleSignIn = () => {
    signInWithGoogle()
    .then(result=>{
        console.log(result)
        navigate(from)
    }
    )
    .catch(error=>{console.log(error)})
  }
    return (
        <div>
            <button onClick={handleGoogleSignIn} className='btn gap-3'><FaGoogle />Login with Google</button>
        </div>
    );
};

export default SocialLogin;