import React, { useState } from 'react';
import { useSignup } from "../hooks/useSignup"
import {styles} from '../styles';
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
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Create Account</h3>
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
              <label>Password: (Must contain at least 8 characters)</label>
              <input className="form-control mt-1"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button disabled = {isLoading} type="submit" className='btn btn-primary'>Sign up</button>
            </div>
            <p className="label">Already have an account? <Link to ="/login">Login</Link></p>
        </div>
      </form>
    </div>
  /*  <div style={styles.Container}>
      
      <h1 style = {styles.Header}>Register with Organizr</h1>
      <div style={{ color: 'red' }}>{error}</div>
      <form className ='signup' onSubmit={handleSubmit} style = {styles.FormContainer}>
        <label>
          Email:
          <input className="input" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      
        <label>
          Password:
          <input className="input" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        
        <button disabled = {isLoading}>Sign up</button>
      </form>
      <p className="label">Already have an account? <Link to ="/login">Login</Link></p>
    </div>
    */
  );
}

export default NewUserPage