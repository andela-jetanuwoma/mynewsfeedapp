import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeView from '../views/HomeView';
import SourcesView from '../views/SourcesView';
import ArticlesView from '../views/ArticlesView';
import Logout from '../views/Logout';
import User from '../models/user';
import '../assets/style/App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" render={() => <HomeView user={User} />} />
        <Route exact path="/discover" render={() => <SourcesView user={User} />} />
        <Route exact path="/articles/:id" component={ArticlesView} />
        <Route exact path="/logout" render={()=><Logout user={User} />} />
      </div>
    </Router>
  );
};


export default App;
