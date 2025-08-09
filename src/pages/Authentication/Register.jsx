import { NavLink, useNavigate } from "react-router";
import loginLottie from "../../assets/register.json"
import Lottie from 'lottie-react';
import { use, useState } from "react";
import { AuthContext } from "../../providers/AuthContext";
import Swal from 'sweetalert2';

const Regitser = () => {
  const { createUser, updateUser } = use(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password should be more than 5 characters";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    return "";
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Clear previous errors
    setPasswordError("");

    // Validate password
    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      return; // Stop if validation fails
    }

    createUser(email, password)
      .then(() => {
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            Swal.fire('Success', 'User created successfully!', 'success').then(() => {
              navigate("/");
            });
          })
          .catch(() => {
            // Optionally show error alert here
          });
      })
      .catch(() => {
        // Optionally show error alert here
      });
  };
    return (
<div className="hero bg-base-100 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <Lottie animationData={loginLottie} loop={true}></Lottie>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleRegister}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="name" className="input" placeholder="Name" name="name"/>
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" name="email" />
          <label className="label">photoURL</label>
          <input type="name" className="input" placeholder="photoURL" name="photo"/>
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" name="password" />
            {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
          <button className="btn btn-neutral mt-4">Login</button>
          <p className='text-xs'>Already have an account? <span className='font-bold'><NavLink to='/login'>Login</NavLink></span></p>
        </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
    );
};

export default Regitser;