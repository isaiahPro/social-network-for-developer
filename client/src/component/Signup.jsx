import React,{Fragment, useState} from 'react'
import "./Style/signup.css"
import {BsFillPersonPlusFill} from "react-icons/bs"
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';





const Login = () => {
const [formData,setFormData] = useState({
  name:"",
  email:"",
  password:"",
  password2:"",

})
const {name,email,password,password2}=formData;
const Onchange=e=>setFormData({...formData,[e.target.name]:e.target.value})
const navigate = useNavigate();
const onSubmit = async e=>{
  e.preventDefault();
  if(password !== password2){
    alert("passwords are not match!")

  }else{
    const newUser={
      name,
      email,
      password
    }
    try {
      const config ={
        headers:{
          "Content-Type":"application/json"
        }
      }
      const body= JSON.stringify(newUser);

      const res = await axios.post("/api/users",body,config);
      console.log(res.data);
      alert("The user Register Successfully")
      navigate('/profile');
      
    } catch (err) {
      if (err.response.status === 423) {
       alert("The user already register please Sign in");
       navigate('/login');

      } else{
        console.error(err.response.data);
        navigate('/signup')

      }
  ;

      
    }
    
  }
}


  return (
    <Fragment>
       <div className='login-main'>
      <div className='login-main-in' >

      <span className='sign-in-title'>Sign Up</span>
      <br />
      <p><BsFillPersonPlusFill/> Create Your Account</p>
      <br />
      <form action="post" className='sign-in-box' onSubmit={e=>onSubmit(e)}>
      <input type="text" placeholder='Name' name='name' value={name} onChange={e=>Onchange(e)} required/>
      <br />
      <br />
      <input type="email" placeholder='Email' name="email" value={email} onChange={e=>Onchange(e)} required />
      <br />
      <br />
      <input type="password" placeholder='Password' name='password' value={password} onChange={e=>Onchange(e)} required />
      <br />
      <br />
      <input type="password" placeholder='confirmPassword' name='password2' value={password2} onChange={e=>Onchange(e)} required />
      <br />
      <br />
      <button type="submit" className='register-button'>Register</button>
      <br />
      <br />
      <p>Already have an account <Link to='/login' style={{color:'blue'}}>sign in</Link></p>

      </form>
     
      </div>

       
    </div>

    </Fragment>
   
  )

}

export default Login