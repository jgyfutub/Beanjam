import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState }  from 'react'
import HomePage from './Pages/Home';
import Loginpage from './Pages/Login';
import SignUppage from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import EditAudio from './Pages/EditAudio';
import OtherDashboards from './Pages/OtherDasboards';
import List from './Pages/List';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/signup' element={<SignUppage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/edit' element={<EditAudio/>}/>
        <Route path='/list' element={<List/>}/>
        <Route path='/accounts/:id' element={<OtherDashboards/>}/>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
