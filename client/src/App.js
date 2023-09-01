
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar,SignUp,Home,Developer,Login,Register} from "./component/index"
function App() {
  return (
    <div className="app">
      
      <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/developer" element={<Developer/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
