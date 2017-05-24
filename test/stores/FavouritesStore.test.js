/* global jest */
import React from 'react';
import ReactDOM from 'react-dom';
import favouritesStore from '../../src/stores/FavouritesStore';
import constants from '../../src/constants/constants';
import Dispatcher from '../../src/dispatcher/AppDispatcher';
import User from '../../src/models/User';

User.login({ name: 'Jude Peter', email: 'wapjude@gmail.com', imageUrl: '' });
const fav = User.favourites();

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('object-assign');

describe('FavouritesStore', () => {
  fav.addCollection('Tech');
  fav.addCollection('Science');

  const favAction = {
    eventName: constants.GET_FAVOURITES
  };

  let callback;

  beforeEach(() => {
    callback = Dispatcher.register.mock.calls[0][0];
  });

  test('registers a callback with the dispatcher', () => {
    expect(Dispatcher.register.mock.calls.length).toBe(1);
  });

  test('initializes with no favourites', () => {
    const all = favouritesStore.getAll().length;
    expect(all).toBe(0);
  });

  test('dispatch the favourites', () => {
    callback(favAction);
    const all = favouritesStore.getAll();
    const keys = Object.keys(all);
    expect(keys.length).toBe(2);
    expect(keys[0]).toEqual('Tech');
  });
});
