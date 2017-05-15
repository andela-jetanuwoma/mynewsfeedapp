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
* Add favourites to collection provided
* @param {string} name Collection name to add favorites to
* @param {string} sourceId Unique sourceId for getting article headlines
* @param {string} sourceName Source name of the favorite
* @return {boolean}
*/
  addFavorites(name, sourceId, sourceName) {
    if (this.hasCollection(name)) {
      if (!this.hasFavourite(name, sourceId)) {
        this.getCollection(name).push({ id: sourceId, title: sourceName });
        this.updateDB();
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
* @return {boolean}
*/

  hasFavourite(name, sourceId) {
    const re = new RegExp(_.escapeRegExp(sourceId), 'i');
    const isMatch = (result) => { return re.test(result.id); };
    const searchFav = _.filter(this.getCollection(name), isMatch);
    return searchFav.length > 0;
  }

/**
*Check if a favorite is all ready contained in any of the collection
* @param {string} sourceId Article source id
* @return {boolean}
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
* @param {sourceId} the news source to be removed
* @return {boolean}
*/
  removeFavourite(name, sourceId) {
    if (this.hasCollection(name)) {
      const index = this.favAt(this.fetchAll()[name], sourceId);
      if (index !== -1) {
        this.getCollection(name).splice(index, 1);
        this.updateDB();
        return true;
      }
    }
    return false;
  }

/**
* Check the index of a favorite in all collections
* @param {array} collections Array of all collections
* @param {string} source News source to search for
* @return {number}
*/
  favAt(collections, source) {
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
