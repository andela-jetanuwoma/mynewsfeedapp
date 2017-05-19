import Cookies from 'js-cookie';
import _ from 'lodash';
import User from './User';
/**
* Collections class that holds Collections and allows favourites to be stored
* in each collection
*/
class Collections {
/**
* Set user unique email for storing favourite if there is an active favourites
* and Collections stored in the cookies it is copied to collection for the users to see
*
* @param {string} email
*/
  constructor(email) {
    this.email = email;
    this.collection = new Map();
    this.saveCollection = Cookies.get(this.email);

    if (this.saveCollection === undefined) {
       // Incase if account has been created before the feature was added
      Cookies.set(this.email, {});
    } else {
      if (User.isLoggedIn()) {
        this.copyToCollection();
      }
    }
  }
/**
* Copy user favourites and collection to cookies and Map
* @return void
*/
  copyToCollection() {
    const db = JSON.parse(this.saveCollection);
    const collections = Object.keys(db);
    collections.forEach((item) => {
      this.collection.set(item, db[item]);
    });
    this.saveCollection = db;
  }
  /**
  * Check if user already create a collections
  * @param {string} name
  * @return {boolean} true if there is a collection existing
  */
  hasCollection(name) {
    return this.collection.has(name);
  }

/**
* @return {array} Retreives user saved collection
*/
  getCollections() {
    return Object.keys(this.fetchAll());
  }
/**
* @param {string} name
* @return {array} retreives favourites stored under a collection
*/
  getCollection(name) {
    return this.collection.get(name);
  }

/**
* Add to users collection
* @param {string} name Collection name to be added
* @return {boolean}
*/
  addCollection(name) {
    if (!this.hasCollection(name)) {
      this.collection.set(name, []);
      this.updateCollection();
      return true;
    }
    return false;
  }
/**
* Removes from users Collections and deleting users favourites under it
* @param {string} name
* @return {boolean}
*/
  deleteCollection(name) {
    if (this.hasCollection(name)) {
      this.collection.delete(name);
      this.updateCollection();
      return true;
    }
    return false;
  }
/**
* Add modified collections to cookies for storage
* @return {void}
*/
  updateCollection() {
    const list = {};
    this.collection.forEach((value, key) => {
      list[key] = value;
    });
    Cookies.set(this.email, list);
    this.saveCollection = list;
  }
/**
* @return {array}  Retreives All collections and favourites associated to a user
*/
  fetchAll() {
    return this.saveCollection;
  }
/**
* Display all collections
* @return {string} list of collection in readable string formats
*/
  toString() {
    return this.collection.keys().join(',');
  }

}

export default Collections;
