import React, {  useState } from 'react';
import {styles} from '../styles';
import {Link} from "react-router-dom";
import { useLogin } from "../hooks/useLogin"


 const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {login, error, isLoading} = useLogin()


  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div className='Auth-form-container'>
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Log In</h3>
            <div className='form-group mt-3'>
              <label>Email:</label>
              <input className="form-control mt-1"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group mt-3'>
              <label>Password:</label>
              <input className="form-control mt-1"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button disabled = {isLoading} type="submit" className='btn btn-primary'>Login</button>
            </div>
            {error?<label style={{ color: 'red' }}>{error}</label>:null} 
          <p className="label">Don't have an account? <Link to ="/signup">Sign Up</Link></p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage