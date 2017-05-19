import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import SourcesList from './SourcesList';
import Articles from './Articles';
import Collection from './Collection';
import Logout from './Logout';
import '../assets/style/index.scss';

/**
* @description Wrapper Component for all Site Components
*/
class App extends React.Component {

  /**
   * render - Set Route path and their respective Component
   *
   * @return {type}  description
   */
  render() {

    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/discover" component={SourcesList} />
          <Route exact path="/articles/:id" component={Articles} />
          <Route exact path="/collection/:id" component={Collection} />
          <Route exact path="/logout" component={Logout} />
        </div>
      </Router>
    );
  }
}


export default App;
