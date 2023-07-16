import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState }  from 'react'
import HomePage from './Pages/Home';
import Loginpage from './Pages/Login';
import SignUppage from './Pages/Signup';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/signup' element={<SignUppage/>}/>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
