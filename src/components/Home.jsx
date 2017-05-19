import React from 'react';
import GoogleLogin from 'react-google-login';
import { Button, Icon } from 'semantic-ui-react';
import createHistory from 'history/createBrowserHistory';
import User from '../models/User';
import siteLogo from '../assets/images/rss.png';

const history = createHistory({
  forceRefresh: true,
});

/**
 * The landing page component
 * Displays the landing page and also allows user login in to the main page
 * @extends React.Component
 */
class Home extends React.Component {

  /**
   * componentWillMount - redirect user to sources if logged in
   *
   * @return {void}
   */
  componentWillMount() {
    if (User.isLoggedIn()) {
      history.push('/discover');
    }
  }

  /**
   * Retrieves User Profile details from their Google plus account
   * And stores them in the cookies for persistency
   * @param  {object} response user details
   * @return {void}
   */
  googleAuth(response) {
    User.login(response.profileObj);
    history.push('/discover');
  }

  /**
   * render - rendered the landing page
   * Displays the landing page with the google login
   * @return {void}
   */
  render() {
    return (
      <div className="wrapper" >
        <div className="upper_section" >
          <div className="container">
            <nav className="site_nav">
              <div className="logo">
                <img alt="Site Name" src={siteLogo} />
              </div>
              <div className="site_name">
                <h2>News Headlines </h2>
              </div>
              <div className="clear" />
            </nav>
            <div className="site_description">
              <header>
                <h1>World Most Powerful News Headlines</h1>
                <h2>Read news from over 70 news sources accross the world!</h2>
              </header>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_SECRET}
                onSuccess={this.googleAuth}
                onFailure={this.googleAuth}
              >
              <Icon name="google plus"></Icon>
               Login With Google
              </GoogleLogin>
            </div>
          </div>
        </div>
        <div className="lower_section" >
          <div className="container">
            <div className="info">
              <img alt="Site Name" src={siteLogo} />
              <p className="footer_text">Copyright <span>©2017</span></p>
              <div className="clear" />
            </div>
            <div className="social_icons">
              <Button circular color="facebook" icon="facebook" />
              <Button circular color="twitter" icon="twitter" />
              <Button circular color="linkedin" icon="linkedin" />
              <Button circular color="google plus" icon="google plus" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
