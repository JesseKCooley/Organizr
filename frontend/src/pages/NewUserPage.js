import React, { useState } from 'react';
import { useSignup } from "../hooks/useSignup"


import {styles} from '../styles';
import {Link} from "react-router-dom";

const NewUserPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {signup, error, isLoading} = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }
  return (
    <div style={styles.Container}>
      
      <h1 style = {styles.Header}>Register with Organizr</h1>
      <div style={{ color: 'red' }}>{error}</div>
      <form className ='signup' onSubmit={handleSubmit} style = {styles.FormContainer}>
      <input style = {styles.Input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input style = {styles.Input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled = {isLoading}>Sign up</button>
      </form>
      <p style = {styles.Label}>Already have an account? <Link to ="/login">Login</Link></p>
    </div>
  );
}

export default NewUserPage