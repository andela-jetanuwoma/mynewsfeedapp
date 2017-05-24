import assign from 'object-assign';
import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/AppDispatcher';
import constants from '../constants/constants';

const CHANGE_EVENT = 'change';
const newsSourcesStore = assign({}, EventEmitter.prototype, {

  /**
   * Sources array that holds all the sources from the Api
   */
  sources: [],

  /**
   * getAll - returns the sources retrieved from the Api
   * @return {array}  news sources from the Api
   */
  getAll() {
    return this.sources;
  },

  /** Anounce if there is any changes in the news sources so that  it will be rendered
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
  * @param {function} callback callback supplied to listen to any changes
  */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});

/* Dispatches any changes on the news sources*/
Dispatcher.register((payload) => {
  switch (payload.eventName) {
    case constants.GET_SOURCES:
      newsSourcesStore.sources = payload.sources;
      newsSourcesStore.emitChange();
      break;
    default:
      break;
  }

  return true;
});

export default newsSourcesStore;
