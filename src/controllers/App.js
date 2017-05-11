import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeComponent from '../views/HomeComponent';
import SourcesComponent from '../views/SourcesComponent';
import ArticlesComponent from '../views/ArticlesComponent';
import CollectionComponent from '../views/CollectionComponent';
import Logout from '../views/Logout';
import User from '../models/user';
import '../assets/style/App.css';
/**
* @description Wrapper Component for all Site Components
*/
class App extends React.Component {
  /** Set state default value*/
  constructor() {
    super();

    this.state = { favourites: User.favourites() };
  }
/** Set Route path and their respective Component*/
  render() {

    const { favourites } = this.state;

    return (
      <Router >
        <div>
          <Route exact path="/" component={HomeComponent} />
          <Route exact path="/discover" component={SourcesComponent } />
          <Route exact path="/articles/:id" component={ArticlesComponent} />
          <Route exact path="/collection/:id" component={CollectionComponent} />
          <Route exact path="/logout" component={Logout} />
        </div>
      </Router>
    );
  }
}


export default App;
