import Cookies from 'js-cookie'
class User {
  constructor(){
    this.userDetails = Cookies.get('mynewsapp') === undefined ? undefined : JSON.parse(Cookies.get('mynewsapp'));
    this.isLogin = this.isLoggedIn();
    this.favorites ='';
    this.name = '';
    this.imageUrl = '';
    this.email = '';
    this.assignUserValues();
  }

  isLoggedIn(){
   return !(this.userDetails === undefined);
  }

  assignUserValues(){
    if(this.isLogin){
      this.favorites = this.userDetails.favorites;
      this.name = this.userDetails.name;
      this.email = this.userDetails.email;
      this.imageUrl = this.userDetails.imageUrl;
    }
  }

  destroyUserValues(){
    this.name = "";
    this.email = "";
    this.imageUrl = "";
  }
  
  Login(context){

    Cookies.set('mynewsapp',{name:context.name,email:context.email,imageUrl:context.imageUrl});
    this.userDetails = JSON.parse(Cookies.get('mynewsapp'));
    this.isLogin = true;
    this.assignUserValues();

  }

  addFavorites(newItem){
    let exists = false;
    this.favorites.forEach((item)=>{
      if(item === newItem){
        exists = true;
        return;
      }
    });
    if(!exists){
      if(this.isLogin){
        this.favorites.push(newItem);
        let userobj = {
          name: this.name,
          email:this.email,
          imageUrl:this.imageUrl, 
          favorites: this.favorites
        };
      Cookies.set('mynewsapp',userobj);
      }
    }
  }

  removeFavourite(item,index){
     this.favorites.splice(index,1);
  }

  logOut(){
    this.isLogin = false;
    Cookies.remove('mynewsapp');
    this.destroyUserValues();
    return true;
  }
}
export default new User();