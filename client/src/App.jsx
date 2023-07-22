import "./App.css";

//npm install react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//our pages; we handled routes through backend
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

//npm install react-hot-toast
//for displaying messages (error/success)
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <div className='app w-[100vw] h-[100vh] flex justify-center items-center'>
        <Toaster />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
