/* global jest*/
import React from 'react';
import ReactDOM from 'react-dom';
import newsSourcesStore from '../../src/stores/NewsSourcesStore';
import AppConstants from '../../src/constants/AppConstants';
import appDispatcher from '../../src/dispatcher/AppDispatcher';

jest.mock('../../src/dispatcher/AppDispatcher');
jest.dontMock('../../src/stores/NewsSourcesStore');
jest.dontMock('object-assign');

describe('NewsSourcesStore', () => {
  const sourceAction = {
    eventName: AppConstants.GET_SOURCES,
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
      appDispatcher.dispatch({
        eventName: AppConstants.GET_ERROR,
        error: errors,
      });
    });

    it('Should have empty sources', () => {
      appDispatcher.dispatch({
        eventName: sourceAction.eventName,
        newItem: sourceAction.sources,
      });

      const expected = newsSourcesStore.getAll();
      expect(expected).toEqual(sourceAction.source);
    });
  });
});
