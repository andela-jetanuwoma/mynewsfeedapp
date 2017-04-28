import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';

const history = createHistory({
  forceRefresh: true
})
 class Logout extends Component{
 	componentWillMount(){
 		const {user} = this.props;
 		user.logOut();
 		history.push('/');
 	}
 }

export default Logout;
