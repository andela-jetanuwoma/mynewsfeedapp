import React from 'react';
import ReactDOM from 'react-dom';
import App from './controllers/App';
import User from './models/user';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

const uservalue = {name:"jude peter",email:"wapjude@gmail.com",imageUrl:"some_picture.jpg"};
User.Login(uservalue);

it('should log user in when values is supplied and store it',()=>{ 
	
	expect(User.isLoggedIn()).toBe(true);
	
});

it('should return jude peter as the name of the logged in user',() => {
	expect(User.name).toEqual("jude peter");
});

it('should return wapjude@gmail.com as the logged in user', ()=>{
	expect(User.email).toEqual("wapjude@gmail.com");
});

it('should return some_picture.jpg as logged in', () => {
	expect(User.imageUrl).toEqual("some_picture.jpg");
});

it('should log user out and remove all user details', () => {
	expect(User.logOut()).toBe(true);
});
it('should be undefined for user name',()=>{
	expect(User.name).toBe("");
});

it('should be undefined for user email',()=>{
	expect(User.email).toBe("");
});

it('should be undefined for user imageUrl',()=>{
	expect(User.imageUrl).toBe("");
});



