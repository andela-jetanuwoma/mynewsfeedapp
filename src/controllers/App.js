import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeView from '../views/HomeView';
import SourcesView from '../views/SourcesView';
import ArticlesView from '../views/ArticlesView';
import CollectionView from '../views/CollectionView';
import Logout from '../views/Logout';
import User from '../models/user';
import '../assets/style/App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = { favourites: User.favourites() };
  }

  render() {
    const { favourites } = this.state;
    return (
      <Router >
        <div>
          <Route exact path="/" render={() => <HomeView user={User} />} />
          <Route exact path="/discover" render={() => <SourcesView user={User} favourites={favourites} />} />
          <Route exact path="/articles/:id" component={ArticlesView} />
          <Route exact path="/collection/:id" component={CollectionView} />
          <Route exact path="/logout" render={() => <Logout user={User} />} />
        </div>
      </Router>
    );
  }
}


export default App;
