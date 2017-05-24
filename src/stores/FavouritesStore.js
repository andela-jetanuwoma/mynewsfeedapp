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
  /**
  * Get all favourite
   * @return {array} users favourite
   * */
  getAll() {
    return this.favourites;
  },

/** Anounce if there is a change in the users favourites so that  it will be rendered
* @return {void}
 */
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
  * Call the callback provided if a change has occurred
  * @param {callback} callback callback supplied
  */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
  * Remove callback
  * @param {function} callback callback supplied to listen to any changes
  */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});
/* Dispatches any changes that occurred to users favourites*/
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
