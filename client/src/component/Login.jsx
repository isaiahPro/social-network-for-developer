import React, { useState } from 'react'
import "./Style/signup.css"
import {BsFillPersonPlusFill} from "react-icons/bs"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useDispatch } from 'react-redux'
import { changedisplay } from "../Store_data/counterSlice_folder/displayNavSlice";
import { setUser, clearUser } from '../Store_data/counterSlice_folder/userDataSlice';


const Login = () => {
 

  const dispatch=useDispatch();

  const [formData,setFormData] = useState({
    email:"",
    password:"",

  
  })

  const {email,password}=formData;
  const Onchange=e=>setFormData({...formData,[e.target.name]:e.target.value})
const navigate = useNavigate();



  const onSubmit = async e=>{
    
    e.preventDefault();
   
    const newUser={
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
  
        const res = await axios.post("/api/auth",body,config);
        console.log(res.data);

        axios.get(`/api/users/${res.data}`).then((res)=>{


          console.log(res.data)

          const user = { id: res.data._id, name:  res.data.name, avatar:res.data.avater};
          dispatch(setUser(user));
        })
        dispatch(changedisplay())
        navigate("/developer");
  
        
      } catch (err) {
    
        alert(" invalid cridential Try again");
     
    

      }
    }





  return (
    <div className='login-main'>
      <div className='login-main-in' >

      <span className='sign-in-title'>Sign In</span>
      <br />
      <p><BsFillPersonPlusFill/> Sign in Your Account</p>
      <br />
      <form action="post" className='sign-in-box'  onSubmit={e=>onSubmit(e)}>
      
      <input type="email" placeholder='Email' name='email' value={email} onChange={e=>Onchange(e)} required/>
      <br />
      <br />
      <input type="password" placeholder='Password' name='password' value={password} onChange={e=>Onchange(e)} required />
      <br />
      <br />
      <button type="submit" className='register-button'>Register</button>
      <br />
      <br />
      <p>Don't have an account <Link to='/signup' style={{color:'blue'}} onClick={()=> dispatch(changedisplay())}>sign up</Link></p>

      </form>
     
      </div>

       
    </div>
  )
}

export default Login