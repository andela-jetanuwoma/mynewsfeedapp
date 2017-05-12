import React from 'react';
import BaseApp from './baseapp';

class Logout extends BaseApp {
  componentWillMount() {
   super.componentWillMount();


    this.user.logOut();
    this.history.push('/');
  }


  render() {
   return (<div>Logout</div>)
  }
 }

export default Logout;
