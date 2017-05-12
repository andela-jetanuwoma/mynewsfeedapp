import React from 'react';
import createHistory from 'history/createBrowserHistory';
import User from '../models/user';


class BaseApp extends React.Component {
  constructor (props) {
    super(props);


    this.history = createHistory({
      forceRefresh:true,
    })
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

  componentWillMount() {
    if (!this.user.isLogin) {
      this.history.push('/');
    }
  }
}

export default BaseApp;
