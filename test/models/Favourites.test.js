import React from 'react';
import ReactDOM from 'react-dom';
import User from '../../src/models/User';

User.login({ name: 'Jude Peter', email: 'wapjude@gmail.com', imageUrl: '' });
const fav = User.favourites();

describe('Favourites model test', () => {
  it('should return true for adding favourite to Tech ', () => {
    expect(fav.addFavorites('Tech', 'abc-news', 'Abc News')).toBe(true);
  });

  it('should return false for adding abc-news again to favourite on Tech ', () => {
    expect(fav.addFavorites('Tech', 'abc-news', 'Abc News')).toBe(false);
  });
});

describe('searching through favourite ', () => {

  it('should return true for searching if abc-news is in Tech ', () => {
    expect(fav.hasFavourite('Tech', 'abc-news')).toBe(true);
  });

  it('should return true for searching if abc-news is in any of the collection ', () => {
    expect(fav.inFavourites('abc-news')).toBe(true);
  });

  it('should return -1  for searching for the index of abc-newsd  in Tech collection', () => {
    expect(fav.getFavoriteIndex(fav.fetchAll()['Tech'], 'abc-newsd')).toBe(-1);
  });

  it('should return 0  for searching for the index of abc-news  in Tech collection', () => {
    expect(fav.getFavoriteIndex(fav.fetchAll()['Tech'], 'abc-news')).toBe(0);
  });
});

describe('deleting favourite ', () => {

  it('should return false for deleting abc-newsd in Tech collection', () => {
    expect(fav.removeFavourite('Tech', 'abc-newsd')).toBe(false);
  });

  it('should return true for deleting abc-news in Tech collection', () => {
    expect(fav.removeFavourite('Tech', 'abc-news')).toBe(true);
  });

  it('should return false for searching if abc-news is in Tech ', () => {
    expect(fav.hasFavourite('Tech', 'abc-news')).toBe(false);
  });
});
