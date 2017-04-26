import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import AppConstants from '../constants/AppConstants';
import assign from 'object-assign';

var CHANGE_EVENT = 'change';

let NewsSourcesStore = assign({}, EventEmitter.prototype, {

    // Actual collection of model data
    sources: [],

    // Accessor method we'll use later
    getAll() {
        return this.sources;
    },

	emitChange(){
		this.emit(CHANGE_EVENT);
	},
	
	/**
   * @param {function} callback
   */
	addChangeListener(callback) {
		this.on( CHANGE_EVENT, callback);
	},

  /**
   * @param {function} callback
   */
	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

AppDispatcher.register( function( payload ) {

    switch( payload.eventName ) {

        case AppConstants.GET_SOURCES:
         
            // We get to mutate data!
            
            
            NewsSourcesStore.sources = payload.newItem;;
			
			      // Tell the world we changed!
            //NewsStore.trigger(CHANGE_EVENT);
			      NewsSourcesStore.emitChange();
			
            break;
        default:
        
        break;

    }

    return true; // Needed for Flux promise resolution

}); 

module.exports = NewsSourcesStore;