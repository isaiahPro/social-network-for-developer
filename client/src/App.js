import {Fragment} from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar,SignUp,Home,Developer,Login,Profile} from "./component/index"
import { useSelector } from 'react-redux'
import EditProfile from "./component/EditProfile";


function App() {
  const isDisplayed= useSelector((state) => state.display.value)
  return (
    <div className="app">
   
    <Router>
        <Fragment>
        <Navbar/>
        {isDisplayed ? (
           <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/developer" element={<Developer/>} />
           <Route path="/login" element={<Login/>} />
           <Route path="/register" element={<SignUp/>} />
           <Route path="/signup" element={<SignUp/>} />
           <Route path="/profile/:id" element={<Profile/>} />
           <Route path="/editprofile" element={<EditProfile/>} />

          
         </Routes>
       
      ) : (
       
       <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/developer" element={<Login/>} />
       <Route path="/login" element={<Login/>} />
       <Route path="/register" element={<Login/>} />
       <Route path="/signup" element={<SignUp/>} />
       <Route path="/profile/:id" element={<Profile/>} />
     </Routes>

      )}
     
        </Fragment>
     
    </Router>
     
    </div>
  );
}

export default App;
