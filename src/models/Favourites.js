import _ from 'lodash';
import Collections from './Collections';

class Favourites extends Collections {
  constructor(email) {
    super(email);
    this.email = email;
  }

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

  hasFavourite(name, sourceId) {
    const re = new RegExp(_.escapeRegExp(sourceId), 'i');
    const isMatch = (result) => { return re.test(result.id); };
    const searchFav = _.filter(this.getCollection(name), isMatch);
    return searchFav.length > 0;
  }

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

  favAt(arr, val) {
    let index = 0;
    let charAt = -1;
    arr.forEach((item) => {
      if (item.id === val) {
        charAt = index;
      }
      index += 1;
    });
    return charAt;
  }
}

export default Favourites;
