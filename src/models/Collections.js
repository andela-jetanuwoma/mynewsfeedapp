import Cookies from 'js-cookie';

class Collections {
  constructor(email) {
    this.email = email;
    if (Cookies.get(this.email) === undefined) {
       // Incase if account has been created before the feature was added
      Cookies.set(this.email, {});
    }
    this.db = new Map(Cookies.get(this.email));
  }

  hasCollection(name) {
    return this.db.has(name);
  }

  getCollections() {
    return this.db.keys();
  }

  getCollection(name) {
    return this.db.get(name);
  }

  addCollection(name) {
    if (!this.hasCollection(name)) {
      this.db.set(name, []);
      return true;
    }
    return false;
  }

  updateCollection(name, values = {}) {
    if (this.hasCollection(name)) {
      this.getCollection(name).push(values);
      this.updateDB();
      return true;
    }
    return false;
  }

  updateDB() {
    Cookies.set(this.user.email, this.db);
    this.user.favorites = this.db;
  }

  toString() {
    return this.db.keys();
  }

}

export default Collections;
