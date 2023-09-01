import React from 'react'
import "./Style/home.css";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home-main-container'><span>Developer Connector</span><br />
    
    <p>Create a developer portfolio, share posts and get help from other developer</p>
    <section className='home-buttons'>
    <Link to="/signup" id='home-signup-button'>Sign Up</Link>
    <Link to="/login" id='home-login-button'>Login</Link>

    </section>
  

    </div>
  )
}
export default Home