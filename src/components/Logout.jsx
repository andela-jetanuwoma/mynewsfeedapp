import React from 'react';
import BaseApp from './baseapp';


/**
 * Logout component to logged the user out
 * @extends BaseApp
 */
class Logout extends BaseApp {

  /**
   * componentWillMount -log the user out and redirect back to the landing page
   *
   * @return {void}
   */
  componentWillMount() {
   super.componentWillMount();


    this.user.logOut();
    this.history.push('/');
  }

/**
 * Renders logged out message if redirection is not successful
 */

  render() {
   return (<div>Logged Out</div>)
  }
 }

export default Logout;
