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
    <div style={styles.Container}>
      
      <h1 style = {styles.Header}>Login</h1>
      <div style={{ color: 'red' }}>{error}</div>
      <form className='login' onSubmit={handleSubmit} style = {styles.FormContainer}>
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
         {error && <div className="error">{error}</div>}
       <button disabled = {isLoading}>Login</button>
      </form>
      <p style = {styles.Label}>Don't have an account? <Link to ="/signup">Sign up</Link></p>
    </div>
  );
}

export default LoginPage