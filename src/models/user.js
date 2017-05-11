import Cookies from 'js-cookie';
import Favourites from './Favourites';

/**
 *  A Model class that manage all users login details from google
 */
class User {

  /**
   * constructor - Setting users default values
   *
   * @return {void}  description
   */
  constructor() {
    this.userDetails = Cookies.get('mynewsapp') === undefined ? undefined : JSON.parse(Cookies.get('mynewsapp'));
    this.isLogin = this.isLoggedIn();
    this.name = '';
    this.imageUrl = '';
    this.email = '';
    this.assignUserValues();
  }

  /**
   * isLoggedIn - Check whether a user is logged in
   *
   * @return {bool}  If user is login
   */
  isLoggedIn() {
    return (this.userDetails !== undefined);
  }

  /**
   * assignUserValues - Copy userDetails from Cookies to this user object
   *
   * @return {void}  description
   */
  assignUserValues() {
    if (this.isLogin) {
      this.name = this.userDetails.name;
      this.email = this.userDetails.email;
      this.imageUrl = this.userDetails.imageUrl;
    }
  }

  /**
   * destroyUserValues - Reset users loggedin details
   *
   * @return {void}
   */
  destroyUserValues() {
    this.name = '';
    this.email = '';
    this.imageUrl = '';
  }

  /**
   * Login - Stores Google login details in Cookies and change user access state
   *
   * @param  {object} context User values returned from google Api
   * @return {void}
   */
  Login(context) {
    Cookies.set('mynewsapp', { name: context.name, email: context.email, imageUrl: context.imageUrl });
    if (Cookies.get(context.email) === undefined) {
      Cookies.set(context.email, {});
    }
    this.userDetails = JSON.parse(Cookies.get('mynewsapp'));
    this.isLogin = true;
    this.assignUserValues();
  }

  /**
   * logOut - Delete user stored cookies and change user access state
   *
   * @return {bool}
   */
  logOut() {
    this.isLogin = false;
    Cookies.remove('mynewsapp');
    this.destroyUserValues();
    return true;
  }

  /**
   * favourites - Returns users favouritesand collections
   *
   * @return {Favourites}  a new instance of the Favourites class   
   */
  favourites() {
    return new Favourites(this.email);
  }
}

export default new User();
