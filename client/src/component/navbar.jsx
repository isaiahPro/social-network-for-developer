import React from 'react';
import "./Style/navbar.css";
import { Link } from 'react-router-dom';
const  Navbar = () => {
 

  return (
    <div className='navbarmain'> 
    <section ><Link to="/" className='nav-bar-link-home'><span id='the-logo-text'>{'</>'} </span>DevConnector</Link> </section>
    <section className='nav-dev-in-row'>
    <section> <Link to="/developer" className='nav-bar-link'>Developer</Link></section>
    <section> <Link to="/register" className='nav-bar-link' >Register</Link></section>
    <section> <Link to="/login" className='nav-bar-link'>Login</Link></section>
    </section>
       
    
    </div>
  )
}

export default Navbar