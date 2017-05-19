import expect from 'expect';
import sinon from 'sinon';
import axios from 'axios';
import mockCall from './mockedData/axios';
import actions from '../../src/actions/actions';
import constants from '../../src/constants/constants';
import Dispatcher from '../../src/dispatcher/AppDispatcher';

describe('actions to get news', () => {
  let spyNews;
  let newsStub;

  beforeEach(() => {
    newsStub = sinon.stub(axios, 'get').callsFake(mockCall.get);
    spyNews = sinon.spy(Dispatcher, 'dispatch');
  });

  afterEach(() => {
    spyNews.reset();
    spyNews.restore();
    newsStub.restore();
  });

  it('Should call dispatch with correct arguments', () => {
    actions.getNews('abc-news').then(() => {
      expect(spyNews.callCount).toBe(1);
      expect(spyNews.firstCall.args[0].eventName).toBe(constants.GET_NEWS);
      expect(spyNews.firstCall.args[0].newItem.length).toBe(3);
    });
  });
});

describe('actions to get News Sources', () => {
  let spyNews;
  let newsStub;

  beforeEach(() => {
    newsStub = sinon.stub(axios, 'get').callsFake(mockCall.get);
    spyNews = sinon.spy(Dispatcher, 'dispatch');
  });

  afterEach(() => {
    spyNews.reset();
    spyNews.restore();
    newsStub.restore();
  });

  it('Should call dispatch with correct arguments', () => {
    actions.getSources().then(() => {
      expect(spyNews.callCount).toBe(1);
      expect(spyNews.firstCall.args[0].eventName).toBe(constants.GET_SOURCES);
      expect(spyNews.firstCall.args[0].newItem.length).toBe(3);
    });
  });
});
