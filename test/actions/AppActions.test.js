import expect from 'expect';
import sinon from 'sinon';
import axios from 'axios';
import mockCall from './mockedData/axios';
import AppActions from '../../src/actions/AppActions';
import AppConstants from '../../src/constants/AppConstants';
import appDispatcher from '../../src/dispatcher/AppDispatcher';

describe('AppActions to get news', () => {
  let spyNews;
  let newsStub;

  beforeEach(() => {
    newsStub = sinon.stub(axios, 'get').callsFake(mockCall.get);
    spyNews = sinon.spy(appDispatcher, 'dispatch');
  });

  afterEach(() => {
    spyNews.reset();
    spyNews.restore();
    newsStub.restore();
  });

  it('Should call dispatch with correct arguments', () => {
    AppActions.getNews('abc-news').then(() => {
      expect(spyNews.callCount).toBe(1);
      expect(spyNews.firstCall.args[0].eventName).toBe(AppConstants.GET_NEWS);
      expect(spyNews.firstCall.args[0].newItem.length).toBe(3);
    });
  });
});

describe('AppActions to get News Sources', () => {
  let spyNews;
  let newsStub;

  beforeEach(() => {
    newsStub = sinon.stub(axios, 'get').callsFake(mockCall.get);
    spyNews = sinon.spy(appDispatcher, 'dispatch');
  });

  afterEach(() => {
    spyNews.reset();
    spyNews.restore();
    newsStub.restore();
  });

  it('Should call dispatch with correct arguments', () => {
    AppActions.getSources().then(() => {
      expect(spyNews.callCount).toBe(1);
      expect(spyNews.firstCall.args[0].eventName).toBe(AppConstants.GET_SOURCES);
      expect(spyNews.firstCall.args[0].newItem.length).toBe(3);
    });
  });
});
