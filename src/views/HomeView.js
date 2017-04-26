import React from 'react';
import   GoogleLogin  from 'react-google-login';
import site_logo from '../assets/images/rss.png';
import { Button } from 'semantic-ui-react';
import createHistory from 'history/createBrowserHistory';

const history = createHistory({
  forceRefresh: true
}) 

 
const HomeView = React.createClass({

  responseGoogle(response){
 console.log(response)
 this.props.user.Login(response.profileObj);
 history.push('/discover');
 
},

    componentWillMount(){
      if(this.props.user.isLoggedIn()){
        history.push('/discover');
      }
    },
   render(){
    
   return <div className="wrapper" >
        <div className="upper_section" >
         <div className="container">
           <nav className="site_nav">
             <div className="logo">
                 <img alt="Site Name" src={site_logo}/>
             </div>
             <div className="site_name">
                <h2>News Headlines </h2>
             </div>
             <div className="clear"></div>
           </nav>
           <div className="site_description">
            <header>
              <h1>World Most Powerful News Headlines</h1>
              <h2>Read news from over 70 news sources accross the world!</h2>
            </header>
            
             <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
  />
           </div>
         </div>

        </div>
        <div className="lower_section" >
          <div className="container">
            <div className="info">
             <img alt="Site Name" src={site_logo}/>
             <p className="footer_text">Copyright <span>©2017</span></p>
             <div className="clear"></div>
             </div>
             <div className="social_icons">
             <Button circular color='facebook' icon='facebook' />
    <Button circular color='twitter' icon='twitter' />
    <Button circular color='linkedin' icon='linkedin' />
    <Button circular color='google plus' icon='google plus' />

             </div>


          </div>
        </div>

       </div>
       }

});


export default HomeView;