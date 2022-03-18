import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* <Nav /> */}
      <Switch>
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
      </Switch>
    </Router>
  );
}

export default App;
