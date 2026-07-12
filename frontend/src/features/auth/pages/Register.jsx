import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth';
const Register = () => {
  const {loading, handleRegister} = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async(e)=>{
      e.preventDefault();
      await handleRegister({username, email, password});
      navigate("/");
  }
  return (
    loading? (
      <main>
        Loading...
      </main>
    )
    :
    <main>
      <div className='form-container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input 
          onChange={(e)=>{setUsername(e.target.value)}}
          type="text" id='username' placeholder='Enter username'/>
          <input 
          onChange={(e)=>{setEmail(e.target.value)}}
          type="email" id='email' placeholder='Enter email' />
          <input
          onChange={(e)=>{setPassword(e.target.value)}}
          type="password" id='password' placeholder='Enter password'/>
          <button type='Submit' className='primary-button'>SignUp</button>
        </form>
        <p>Already have an account? <Link className='Link' to={"/login"}>Login</Link></p>
      </div>
    </main>
  )
}

export default Register
