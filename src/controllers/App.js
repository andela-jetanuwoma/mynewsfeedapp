import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import HomeView from '../views/HomeView';
import User from '../models/user';
import '../assets/style/App.css';

class App extends Component {
  render() {
    return (
       <Router>

        <div>

             <Route exact path="/" render={()=><HomeView user={User} />}  />

        </div>

        </Router>
    );
  }
}

export default App;
