import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // -v 6.3.0
import Home from "./views/home"

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Home/>} exact></Route>
        <Route path={"/:name"} element={<Home/>} exact></Route>
      </Routes>
    </Router>
  );
}


export default App;
