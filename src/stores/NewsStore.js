import assign from 'object-assign';
import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/AppDispatcher';
import constants from '../constants/constants';

const CHANGE_EVENT = 'change';
const newsStore = assign({}, EventEmitter.prototype, {
  news: [],

  /**
   * getAll - returns the articles retrieved from the Api
   * @return {array}  news sources from the Api
   */
  getAll() {
    return this.news;
  },

  /** Anounce if there is any changes in the news Articles so that  it will be rendered
  * @return {void}
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
  * Call the callback provided if a change has occurred
  * @param {callback} callback callback supplied
  * @return {void}
  */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
  * Remove callback to unregister emitting changes
  * @param {function} callback
  */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});

/* Dispatches any changes on the news Articles*/
Dispatcher.register((payload) => {
  switch (payload.eventName) {
    case constants.GET_NEWS:
      newsStore.news = payload.news;
      newsStore.emitChange();
      break;
    default:
      break;
  }

  return true;
});

export default newsStore;
