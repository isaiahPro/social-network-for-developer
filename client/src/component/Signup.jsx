import React from 'react'
import "./Style/signup.css"
import {BsFillPersonPlusFill} from "react-icons/bs"
import { Link } from 'react-router-dom';


const Login = () => {
  return (
    <div className='login-main'>
      <div className='login-main-in' >

      <span className='sign-in-title'>Sign Up</span>
      <br />
      <p><BsFillPersonPlusFill/> Create Your Account</p>
      <br />
      <form action="post" className='sign-in-box'>
      <input type="text" placeholder='Name' />
      <br />
      <br />
      <input type="email" placeholder='Email' />
      <br />
      <br />
      <input type="password" placeholder='Password' />
      <br />
      <br />
      <input type="password" placeholder='confirmPassword' />
      <br />
      <br />
      <button type="submit" className='register-button'>Register</button>
      <br />
      <br />
      <p>Already have an account <Link to='/login' style={{color:'blue'}}>sign in</Link></p>

      </form>
     
      </div>

       
    </div>
  )
}

export default Login