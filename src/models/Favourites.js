import _ from 'lodash';
import Collections from './Collections';

/**
* Storing user favourites to collection
*/
class Favourites extends Collections {
/**
* Set users unique mail for storing favourites
* @param {string} email
*/
  constructor(email) {
    super(email);
    this.email = email;
  }
/**
* Add favourites to collection provided it makes a recursive call to create a collection
* if it has not been created and afterwards add the collection to it
* @param {string} name Collection name to add favorites to
* @param {string} sourceId Unique sourceId for getting article headlines
* @param {string} sourceName Source name of the favorite
* @return {boolean} return true if the operation was successful otherwise it returns false
*/
  addFavorites(name, sourceId, sourceName) {
    if (this.hasCollection(name)) {
      if (!this.hasFavourite(name, sourceId)) {
        this.getCollection(name).push({ id: sourceId, title: sourceName });
        this.updateCollection();
        return true;
      }
    } else {
      this.addCollection(name);
      return this.addFavorites(name, sourceId, sourceName);
    }
    return false;
  }
/**
* Check if a favorite is already contained in a collection
* @param {string} name Collection name
* @param {string} sourceId Article source id
* @return {boolean} returns true if the favourites have been existing in the collection
*/
  hasFavourite(name, sourceId) {
    const re = new RegExp(_.escapeRegExp(sourceId), 'i');
    const isMatch = (result) => { return re.test(result.id); };
    const searchFav = _.filter(this.getCollection(name), isMatch);
    return searchFav.length > 0;
  }

/**
*Check if a favorite is in already contained in any of the collection that has been created
* @param {string} sourceId Article source id
* @return {boolean} Return true if it exists in any of the created collections
*/
  inFavourites(sourceId) {
    // Search through all collection
    const collection = this.getCollections();
    let result = false;
    collection.forEach((col) => {
      if (this.hasFavourite(col, sourceId)) {
        result = true;
      }
    });
    return result;
  }
/**
* Removes favourites from collection
* @param {string} name Collection name
* @param {string} sourceId news source to be removed
* @return {boolean} return true if it was added successfully otherwise it returns false
*/
  removeFavourite(name, sourceId) {
    if (this.hasCollection(name)) {
      const index = this.getFavoriteIndex(this.fetchAll()[name], sourceId);
      if (index !== -1) {
        this.getCollection(name).splice(index, 1);
        this.updateCollection();
        return true;
      }
    }
    return false;
  }

/**
* Check the index of a favorite in all collections
* @param {array} collections Array of all collections
* @param {string} source News source to search for
* @return {number} returns the index the favourites is in the list of collection available
*/
  getFavoriteIndex(collections, source) {
    let index = 0;
    let charAt = -1;
    collections.forEach((item) => {
      if (item.id === source) {
        charAt = index;
      }
      index += 1;
    });
    return charAt;
  }
}

export default Favourites;
