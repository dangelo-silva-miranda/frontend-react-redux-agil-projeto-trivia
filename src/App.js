import React from 'react';
import { Route, Switch } from 'react-router';
// import logo from './trivia.png';
import './App.css';
import Header from './components/Header';
// import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      {/* <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
      </div> */}
      <Route exact path="/" component={ Header } />
    </Switch>
  );
}
