import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home';
import Sources from './sources';
import Articles from './articles';
import Collection from './collection';
import Logout from './logout';
import '../assets/style/App.css';

/**
* @description Wrapper Component for all Site Components
*/
class App extends React.Component {
/** Set Route path and their respective Component*/
  render() {

    return (
      <Router >
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/discover" component={Sources} />
          <Route exact path="/articles/:id" component={Articles} />
          <Route exact path="/collection/:id" component={Collection} />
          <Route exact path="/logout" component={Logout} />
        </div>
      </Router>
    );
  }
}


export default App;
