import assign from 'object-assign';
import { EventEmitter } from 'events';
import appDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
const newsStore = assign({}, EventEmitter.prototype, {
  news: [],
  /* Get all news */
  getAll() {
    return this.news;
  },
/* Anounce Change */
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  /**
  * Register callback
  * @param {function} callback
  */

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  /**
  * Remove callback
  * @param {function} callback
  */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});
appDispatcher.register((payload) => {
  switch (payload.eventName) {
    case AppConstants.GET_NEWS:
      newsStore.news = payload.news;
      newsStore.emitChange();
      break;
    default:
      break;
  }

  return true;
});

export default newsStore;
