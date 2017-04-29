import Cookies from 'js-cookie';
import Favourites from './Favourites';

class User {
  constructor() {
    this.userDetails = Cookies.get('mynewsapp') === undefined ? undefined : JSON.parse(Cookies.get('mynewsapp'));
    this.isLogin = this.isLoggedIn();
    this.name = '';
    this.imageUrl = '';
    this.email = '';
    this.assignUserValues();
  }

  isLoggedIn() {
    return (this.userDetails !== undefined);
  }

  assignUserValues() {
    if (this.isLogin) {
      this.name = this.userDetails.name;
      this.email = this.userDetails.email;
      this.imageUrl = this.userDetails.imageUrl;
    }
  }

  destroyUserValues() {
    this.name = '';
    this.email = '';
    this.imageUrl = '';
  }

  Login(context) {
    Cookies.set('mynewsapp', { name: context.name, email: context.email, imageUrl: context.imageUrl });
    if (Cookies.get(context.email) === undefined) {
      Cookies.set(context.email, {});
    }
    this.userDetails = JSON.parse(Cookies.get('mynewsapp'));
    this.isLogin = true;
    this.assignUserValues();
  }

  logOut() {
    this.isLogin = false;
    Cookies.remove('mynewsapp');
    this.destroyUserValues();
    return true;
  }

  favourites() {
    return new Favourites(this.email);
  }
}

export default new User();
