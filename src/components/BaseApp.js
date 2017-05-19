import React from 'react';
import createHistory from 'history/createBrowserHistory';
import User from '../models/User';


/**
 * Base component for components rquiring authentication
 */
class BaseApp extends React.Component {

  /**
   * constructor - set default values for app header
   *
   * @param  {object} props props received from parent component
   * @return {void}
   */
  constructor (props) {
    super(props);


    this.history = createHistory({
      forceRefresh: true,
    });

    this.user = User;

    this.menuOptions = [
      {
        key: 'sign-out',
        text: 'Sign Out',
        icon: 'sign out',
        href: '/logout',
      },
    ];
  }

  /**
   * componentWillMount - redirect the user to landing page when not logged in
   *
   * @return {void}
   */
  componentWillMount() {
    if (!this.user.isLoggedIn()) {
      this.history.push('/');
    }
  }
}

export default BaseApp;
