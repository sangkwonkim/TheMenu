import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main/Main'

function App() {
  return (
    <Router>
      <Main />
      <Routes>
        <Route exact path='/'>
        </Route>
        <Route path='/question'>
        </Route>
        <Route path='/login'>
        </Route>
        <Route path='/signup'>
        </Route>
        <Route path='/myPage'>
        </Route>
        <Route path='/map'>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
