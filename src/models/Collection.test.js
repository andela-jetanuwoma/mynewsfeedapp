import React from 'react';
import ReactDOM from 'react-dom';
import Favourites from './Favourites';
import User from './user';
//Log user in
User.Login({name:"Jude Peter",email:"wapjude@gmail.com", imageUrl:""});
const fav = User.favourites();

it('should return true for adding Tech to collection', () => {
    expect(fav.addCollection("Tech")).toBe(true);
});
it('should return true for adding Sport to collection', () => {
    expect(fav.addCollection("Sport")).toBe(true);
});

it('should return true for adding Crime to collection', () => {
    expect(fav.addCollection("Crime")).toBe(true);
});

it('should return false for adding Tech to collection again', () => {
    expect(fav.addCollection("Tech")).toBe(false);
});

it('should return true for deleting existing Collection ', () => {
    expect(fav.deleteCollection("Tech")).toBe(true);
});

it('should return false for deleting non existing Collection ', () => {
    expect(fav.deleteCollection("Tech")).toBe(false);
});

it('should return object as typeof collections', () => {
    expect(typeof fav.toString()).toBe("object");

});
