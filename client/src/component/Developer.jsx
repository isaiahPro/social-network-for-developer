import React, { useEffect,useState} from 'react';
import "./Style/developer.css";
import {FaConnectdevelop} from "react-icons/fa";
import {BsCheckLg} from "react-icons/bs";
import { Link } from 'react-router-dom';
import axios from "axios";
import Loading from './loading';



const Developer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);



  
  useEffect(() => {
    axios.get('/api/users/cover')
      .then((res) => {
      setData(res.data);
      setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching date from backend:', error);
      });
  }, []);


  return (
    <div className='developer-main-container'>
      {loading ? (
        <Loading/>
      ) : (
        <div className='developer-in-box'>
        <span className='developer-title'>Developers</span>
        <p><FaConnectdevelop/> Browse and connect with developer</p>
        {data.map(item => (


       <div className='developer-profile-out-out' key={item.id}>
        <section className='developer-profile-out'>
           <img src={item.user.avater} alt="profile image" /> 
           <section className='developer-profile-out-in-name'>
            <section>{item.user.name}</section>
            <section><span className='developer-othercolorstyle'>Work at:</span>{item.company}</section>
            <section><span className='developer-othercolorstyle'>Location:</span>{item.location}</section>
            <button type="submit"><Link className='buttonview' to={`/profile/${item.user._id}`}>View Profile</Link></button>
          </section>
        </section>

        <section className='developer-profile-out-in-skill'> 
        {item.skills.map((skill) => (
                <section key={skill}>
                  <BsCheckLg /> {skill}
                </section>
              ))}
        </section>
       </div>
      
      ))}
      </div>

      )}
     
       
    </div>
  )
}

export default Developer