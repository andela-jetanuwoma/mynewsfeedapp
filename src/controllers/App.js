import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeView from '../views/HomeView';
import SourcesView from '../views/SourcesView';
import User from '../models/user';
import '../assets/style/App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" render={() => <HomeView user={User} />} />
        <Route exact path="/discover" render={() => <SourcesView user={User} />} />
      </div>
    </Router>
  );
};


export default App;
