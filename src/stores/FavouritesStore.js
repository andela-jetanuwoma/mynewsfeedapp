import assign from 'object-assign';
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import User from '../models/user';
const CHANGE_EVENT = 'change';


/**
 * Favourites store that emits change to the FavouritesComponent
 */
const favouritesStore = assign({}, EventEmitter.prototype, {
  favourites: [],
  getAll() {
    return this.favourites;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});
AppDispatcher.register((payload) => {
  switch (payload.eventName) {
    case AppConstants.GET_FAVOURITES:
      favouritesStore.favourites = User.favourites().fetchAll();
      favouritesStore.emitChange();
      break;
    default:
      break;
  }

  return true;
});

export default favouritesStore;
