import React from 'react'
import { useState, useContext } from 'react'
import "../auth.style.scss"
import { Link, useNavigate, Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { AuthContext } from '../auth.context'
const Login = () => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, handleLogin } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    // navigate("/")
  }
  if(user){
    return <Navigate to={"/"} replace></Navigate>
  }
  return (
    
    //   loading?
    //     (
    //     <main>
    // <h1>Loading</h1>
    //     </main >
    //   ):

<main>
  <div className='form-container'>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <input
        onChange={(e) => { setEmail(e.target.value) }}
        type="email" id='email' placeholder='Enter email' />
      <input
        onChange={(e) => { setPassword(e.target.value) }}
        type="password" id='password' placeholder='Enter password' />
      <button disabled={loading}  type='Submit' className='primary-button'>{loading?"Logging in...": "Login"}</button>
    </form>
    <p>Do not have an account? <Link className='Link' to={"/register"}>Create account</Link></p>
  </div>
</main>
    
  )
}

export default Login
