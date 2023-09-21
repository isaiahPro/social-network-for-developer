import React, { useEffect, useState } from 'react'
import "./Style/profile.css"
import {TfiWorld} from "react-icons/tfi"
import {BsTwitter} from "react-icons/bs"
import {FaFacebookF} from "react-icons/fa";
// import {FaLinkedinIn} from "react-icons/fa";
import {BsYoutube} from "react-icons/bs";
// import {FaTelegramPlane} from "react-icons/fa"
import axios from "axios"
import { useParams } from 'react-router-dom';
import Loading from './loading';
import {AiTwotoneEdit} from "react-icons/ai";
import { Link } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();

  const [user_data,SetUser_data] = useState([]);
  const [user_data2,SetUser_data2] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get(`/api/profile/user/${id}`)
      .then((res) => {
      SetUser_data(res.data)
      setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching date from backend:', error);
        if(error.response.status===400){
          console.log("profile doesnot exit")
        }
      });
  });

  useEffect(()=>{
    axios.get(`/api/users/${id}`).then((res)=>{
      SetUser_data2(res.data);
    }).catch(error=>{
      console.error('Error fetching date from backend:', error);
        if(error.response.status===404){
          console.log("User doesnot exit")
        }

    })
  })




  return (
    <div className='profile-main-container'>
        {loading ? (
        <Loading/>
      ) : (

      <div>
        <div className="top-profile">
            <img className="indv-profile-pic"  src={user_data2.avater}/>
                 <p> <span className='indv-profile-tittle'>{user_data.user.name}</span>
                 <br />
              <br />{user_data.company}
              <br />location: {user_data.location}</p>

            <section className='social-media-icon'>
                <a href={`${user_data.website}`}><TfiWorld className='Social-media-icon-in'/></a><br/>
                <a  href={`${user_data.social.twitter}`}><BsTwitter className='Social-media-icon-in'/></a><br/>
                <a  href={`${user_data.social.facebook}`}><FaFacebookF className='Social-media-icon-in'/></a><br/>
                <a  href={`${user_data.social.youtube}`}><BsYoutube className='Social-media-icon-in'/></a><br/>
            </section>

        </div>
        <div className="About_profile_data" >
          <h3>About</h3>
          <p>Lorem ipsum dolor sit amet consectetur
             adipisicing elit. Cum nisi sapiente
              voluptas. Adipisci, eligendi neque facilis,
               exercitationem ratione placeat eius beatae culpa dolorum ipsum alias deleniti incidunt eum quibusdam totam.</p>
         <div  >
          <h3>Experiance</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur
             adipisicing elit. Obcaecati 
             maiores aspernatur veritatis cupiditate culpa aut non, voluptate ea quasi aliquam, distinctio reprehenderit recusandae iste. Nesciunt inventore eum vero ducimus harum!
          </p>

        </div>
        <div >
          <h3>Education</h3>
          <p>
            Lorem ipsum dolor sit amet 
            
            consectetur, adipisicing elit. Necessitatibus, autem nobis at magni minima aut dolorem. Impedit dolorum vel numquam cupiditate doloribus minima at qui rerum! Officiis itaque sunt cupiditate!
          </p>

        </div>
        <div >
          <h3>Posts</h3>
          <p>
            Lorem ipsum dolor sit amet 
            consectetur, adipisicing elit. Necessitatibus, autem nobis at magni minima aut dolorem. Impedit dolorum vel numquam cupiditate doloribus minima at qui rerum! Officiis itaque sunt cupiditate!
          </p>

        </div>
        </div>
      
        
       
        
        

      </div>



        
        
        


      )}

        
<div className='edit_profile_button'><Link to={"/editprofile"} style={{textDecoration:"none",color:"white"}}> Edit<AiTwotoneEdit/></Link></div>


    </div>
  )
}

export default Profile