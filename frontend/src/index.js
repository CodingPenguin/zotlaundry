import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/homepage';
import './index.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.render(
  <Router>
      <Routes>
        <Route path="/" element ={ <HomePage />}></Route>
      </Routes>
  </Router>,
  document.getElementById('root')
);
