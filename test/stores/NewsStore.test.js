/* global jest */
import React from 'react';
import ReactDOM from 'react-dom';
import newsStore from '../../src/stores/NewsStore';
import constants from '../../src/constants/constants';
import Dispatcher from '../../src/dispatcher/AppDispatcher';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/NewsStore');
jest.dontMock('object-assign');

describe('NewsStore', () => {
  const newsAction = {

    eventName: constants.GET_NEWS,
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
    callback = Dispatcher.register.mock.calls[0][0];
  });

  test('registers a callback with the dispatcher', () => {
    expect(Dispatcher.register.mock.calls.length).toBe(1);
  });

  test('The store initializes with no data', () => {
    const all = newsStore.getAll().length;
    expect(all).toBe(0);
  });

  test('dispatch the news', () => {
    callback(newsAction);
    const all = newsStore.getAll();
    const keys = Object.keys(all);
    expect(keys.length).toBe(2);
    expect(all[keys[0]].title).toEqual('Checkpoint Defence rigged');
  });
});
