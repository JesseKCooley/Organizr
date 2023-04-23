import React, { useState } from 'react';
import { useSignup } from "../hooks/useSignup"
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const NewUserPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {signup, error, isLoading} = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }
  return (   
    <div className='Auth-form-container'>
      <form class="needs-validation" novalidate className="Auth-form" onSubmit={handleSubmit}  >
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Create Account</h3>
            <div className='form-group mt-3'>
              <label for="validationCustom01">Email:</label>
              <input className="form-control mt-1"
                type="email"
                class="form-control"
                id="validationCustom01"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div class="invalid-feedback">
                Please provide a valid email.
              </div>
            </div>
            <div className='form-group mt-3'>
              <label>Password:</label>
              <input className="form-control mt-1"
                type="password"
                class="form-control"
                id="validationCustom02"
                placeholder="Enter password"
                value={password}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div class="invalid-feedback">
                Please provide a valid password.
              </div>
              <small id="passwordHelpBlock" class="form-text text-muted">
              Your password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, 
              one number and one special character.
              </small>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button disabled = {isLoading} type="submit" className='btn btn-primary'>Sign up</button>
            </div>
            {error?<label style={{ color: 'red' }}>{error}</label>:null} 
            <p className="label">Already have an account? <Link to ="/login">Login</Link></p>
        </div>
      </form>
    </div>


  );
}

export default NewUserPage