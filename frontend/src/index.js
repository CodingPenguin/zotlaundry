import React from 'react';
import NavBar from "./components/navbar";
import ReactDOM from 'react-dom';
import HomePage from './components/homepage';
import Footer from './components/footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.render(
  <Router>
    <NavBar/>
      <Routes>
        <Route path="/" element ={ <HomePage />}></Route>
      </Routes>
    <Footer/>
  </Router>,
  document.getElementById('root')
);
