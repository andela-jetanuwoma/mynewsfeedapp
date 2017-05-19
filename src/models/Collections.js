import Cookies from 'js-cookie';
import _ from 'lodash';
import User from './User';
/**
* Collections class that holds favourite
*/
class Collections {
/**
* Set user unique email for storing favourite
* @param {string} email
*/
  constructor(email) {
    this.email = email;
    this.db = new Map();
    this.existing = Cookies.get(this.email);

    if (this.existing === undefined) {
       // Incase if account has been created before the feature was added
      Cookies.set(this.email, {});
    } else {
      if (User.isLoggedIn()) {
        this.copyToDb();
      }
    }
  }
/**
* Copy user favourites and collection to cookies and Map
* @return void
*/
  copyToDb() {
    const db = JSON.parse(this.existing);
    const collections = Object.keys(db);
    collections.forEach((item) => {
      this.db.set(item, db[item]);
    });
    this.existing = db;
  }
  /**
  * Check if user already create a collections
  * @param {string} name
  * @return {boolean}
  */
  hasCollection(name) {
    return this.db.has(name);
  }

/**
* Retreives user saved collection
* @return {array}
*/
  getCollections() {
    return Object.keys(this.fetchAll());
  }
/**
* Retreives favourites stored under a collection
* @param {string} name
* @return {array}
*/
  getCollection(name) {
    return this.db.get(name);
  }

/**
* Add to users collection
* @param {string} name Collection name to be added
* @return {boolean}
*/
  addCollection(name) {
    if (!this.hasCollection(name)) {
      this.db.set(name, []);
      this.updateDB();
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
      this.db.delete(name);
      this.updateDB();
      return true;
    }
    return false;
  }
/**
* Add modified collections to cookies for storages
* @return {void}
*/
  updateDB() {
    const val = {};
    this.db.forEach((value, key) => {
      val[key] = value;
    });
    Cookies.set(this.email, val);
    this.existing = val;
  }
/**
* Retreives All collections and favourites associated to a user
* @return {array}
*/
  fetchAll() {
    return this.existing;
  }
/**
* Display all collections
*/
  toString() {
    return this.db.keys();
  }

}

export default Collections;
