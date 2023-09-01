import React from 'react'
import "./Style/signup.css"
import {BsFillPersonPlusFill} from "react-icons/bs"
import { Link } from 'react-router-dom';


const Login = () => {
  return (
    <div className='login-main'>
      <div className='login-main-in' >

      <span className='sign-in-title'>Sign In</span>
      <br />
      <p><BsFillPersonPlusFill/> Sign in Your Account</p>
      <br />
      <form action="post" className='sign-in-box'>
      
      <input type="email" placeholder='Email' />
      <br />
      <br />
      <input type="password" placeholder='Password' />
      <br />
      <br />
      <button type="submit" className='register-button'>Register</button>
      <br />
      <br />
      <p>Don't have an account <Link to='/signup' style={{color:'blue'}}>sign up</Link></p>

      </form>
     
      </div>

       
    </div>
  )
}

export default Login