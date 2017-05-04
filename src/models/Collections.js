import Cookies from 'js-cookie';
import _ from 'lodash';
import User from './user';

class Collections {
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
  copyToDb() {
    const db = JSON.parse(this.existing);
    const collections = Object.keys(db);
    collections.forEach((item) => {
      this.db.set(item, db[item]);
    });
    this.existing = db;
  }
  hasCollection(name) {
    return this.db.has(name);
  }

  getCollections() {
    return Object.keys(this.fetchAll());
  }

  getCollection(name) {
    return this.db.get(name);
  }

  addCollection(name) {
    if (!this.hasCollection(name)) {
      this.db.set(name, []);
      this.updateDB();
      return true;
    }
    return false;
  }

  deleteCollection(name) {
    if (this.hasCollection(name)) {
      this.db.delete(name);
      this.updateDB();
    }
  }

  updateDB() {
    const val = {};
    this.db.forEach((value, key) => {
      val[key] = value;
    });
    Cookies.set(this.email, val);
    this.existing = val;
  }
  fetchAll() {
    return this.existing;
  }

  toString() {
    return this.db.keys();
  }

}

export default Collections;
