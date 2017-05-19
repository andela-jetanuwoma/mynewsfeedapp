/* global jest*/
import React from 'react';
import ReactDOM from 'react-dom';
import newsSourcesStore from '../../src/stores/NewsSourcesStore';
import constants from '../../src/constants/constants';
import Dispatcher from '../../src/dispatcher/AppDispatcher';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/NewsSourcesStore');
jest.dontMock('object-assign');

describe('NewsSourcesStore', () => {
  const sourceAction = {
    eventName: constants.GET_SOURCES,
    sources: [{
      title: 'ABC NEWS',
      description: 'Best Alphabetic news',
    },
    {
      title: 'Aljazeera',
      description: 'Check Boko haram staus '
    }],
  };

  describe('NewsSourcesStore', () => {
    const errors = 'we have network error';

    it('Should match the expected Error', () => {
      Dispatcher.dispatch({
        eventName: constants.GET_ERROR,
        error: errors,
      });
    });

    it('Should have empty sources', () => {
      Dispatcher.dispatch({
        eventName: sourceAction.eventName,
        newItem: sourceAction.sources,
      });

      const expected = newsSourcesStore.getAll();
      expect(expected).toEqual([]);
    });
  });
});
