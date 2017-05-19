import assign from 'object-assign';
import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/AppDispatcher';
import constants from '../constants/constants';
import User from '../models/User';
const CHANGE_EVENT = 'change';


/**
 * Favourites store that emits change to the FavouritesComponent
 */
const favouritesStore = assign({}, EventEmitter.prototype, {
  favourites: [],
  /* Get all favourite*/

  getAll() {
    return this.favourites;
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
Dispatcher.register((payload) => {
  switch (payload.eventName) {
    case constants.GET_FAVOURITES:
      favouritesStore.favourites = User.favourites().fetchAll();
      favouritesStore.emitChange();
      break;
    default:
      break;
  }

  return true;
});

export default favouritesStore;
