import {Fragment} from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar,SignUp,Home,Developer,Login,Profile} from "./component/index"

import {Provider} from 'react-redux';
import store from "../src/Store_data/Store";
import { Counter } from "./Counter";
function App() {
  return (
    <div className="app">
    <Provider store={store} >
    <Router>
        <Fragment>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/developer" element={<Developer/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<SignUp/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/profile/:id" element={<Profile/>} />
        <Route path="/try" element={<Counter/>} />

      </Routes>
        </Fragment>
     
    </Router>

    </Provider>
     
    </div>
  );
}

export default App;
