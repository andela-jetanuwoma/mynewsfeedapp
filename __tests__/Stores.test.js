import React from 'react';
import ReactDOM from 'react-dom';
import NewsStore from '../src/stores/NewsStore';
import NewsSourcesStore from '../src/stores/NewsSourcesStore';
import FavouritesStore from '../src/stores/FavouritesStore';
import AppConstants from '../src/constants/AppConstants';
import AppDispatcher from '../src/dispatcher/AppDispatcher';
import User from '../src/models/user';
//Log user in
User.Login({name:"Jude Peter",email:"wapjude@gmail.com", imageUrl:""});
const fav = User.favourites();

jest.mock('../src/dispatcher/AppDispatcher');
jest.dontMock('../src/stores/NewsStore');
jest.dontMock('../src/stores/NewsSourcesStore');
jest.dontMock('object-assign');

describe('NewsStore', () => {
  const newsAction = {
    eventName: AppConstants.GET_NEWS,
    news: [{
      title: 'Checkpoint Defence rigged',
      description: 'The waiting police at the Checkpoint failed to catch the thief because they took a flight above the police car',
    }, {
      title: 'Nokia 3310c Outshine iphone7',
      description: 'The surprise came in when it was discover that 3310c has a snake game that iphone7 could not replicate. stay tuned'
    }]
  };
  let callback;
  beforeEach(() => {
    callback = AppDispatcher.register.mock.calls[0][0];
  });
  test('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(3);
  });

  test('The store initializes with no data', () => {
    const all = NewsStore.getAll().length;
    expect(all).toBe(0);
  });
  test('dispatch the news', () => {
    callback(newsAction);
    const all = NewsStore.getAll();
    const keys = Object.keys(all);
    expect(keys.length).toBe(2);
    expect()
    expect(all[keys[0]].title).toEqual('Checkpoint Defence rigged');
  });
});

describe('NewsSourcesStore', () => {
  const sourceAction = {
    eventName: AppConstants.GET_SOURCES,
    newItem: [{
      title: 'ABC NEWS',
      description: 'Best Alphabetic news',
    }, {
      title: 'Aljazeera',
      description: 'Check Boko haram staus '
    }]
  };
  let callback;
  beforeEach(() => {
    callback = AppDispatcher.register.mock.calls[1][0];
  });
  test('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(3);
  });

  test('The store initializes with no data', () => {
    const all = NewsSourcesStore.getAll().length;
    expect(all).toBe(0);
  });
  test('dispatch the news', () => {
    callback(sourceAction);
    const all = NewsSourcesStore.getAll();
    const keys = Object.keys(all);
    expect(keys.length).toBe(2);
    expect()
    expect(all[keys[0]].title).toEqual('ABC NEWS');
  });
});

describe('FavouritesStore', () => {
  fav.addCollection("Tech");
  fav.addCollection("Science");
  const favAction = {
    eventName: AppConstants.GET_FAVOURITES
  };
  let callback;
  beforeEach(() => {
    callback = AppDispatcher.register.mock.calls[2][0];
  });
  test('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(3);
  });

  test('The store initializes with no data', () => {
    const all = FavouritesStore.getAll().length;
    expect(all).toBe(0);
  });
  test('dispatch the news', () => {
    callback(favAction);
    const all = FavouritesStore.getAll();
    const keys = Object.keys(all);
    expect(keys.length).toBe(2);
    expect(keys[0]).toEqual('Tech');
  });
});
