import React from 'react';
import ReactDOM from 'react-dom';
import Favourites from '../../src/models/Favourites';
import User from '../../src/models/user';
//Log user in
User.Login({name:"Jude Peter",email:"wapjude@gmail.com", imageUrl:""});
const fav = User.favourites();

it('should return true for adding favourite to Tech ', () => {
    expect(fav.addFavorites("Tech","abc-news","Abc News")).toBe(true);
});

it('should return false for adding abc-news again to favourite on Tech ', () => {
    expect(fav.addFavorites("Tech","abc-news","Abc News")).toBe(false);
});

it('should return true for searching if abc-news is in Tech ', () => {
    expect(fav.hasFavourite("Tech","abc-news")).toBe(true);
});

it('should return true for searching if abc-news is in any of the collection ', () => {
    expect(fav.inFavourites("abc-news")).toBe(true);
});
it('should return -1  for searching for the index of abc-newsd  in Tech collection', () => {
    expect(fav.favAt(fav.fetchAll()["Tech"],"abc-newsd")).toBe(-1);
});
it('should return 0  for searching for the index of abc-news  in Tech collection', () => {
    expect(fav.favAt(fav.fetchAll()["Tech"],"abc-news")).toBe(0);
});

it('should return false for deleting abc-newsd in Tech collection', () => {
    expect(fav.removeFavourite("Tech","abc-newsd")).toBe(false);
});

it('should return true for deleting abc-news in Tech collection', () => {
    expect(fav.removeFavourite("Tech","abc-news")).toBe(true);
});

it('should return false for searching if abc-news is in Tech ', () => {
    expect(fav.hasFavourite("Tech","abc-news")).toBe(false);
});
