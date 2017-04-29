import Cookies from 'js-cookie';
import Collections from './Collections';

class Favourites extends Collections {
  constructor(email) {
    super(email);
  }

  addFavorites(name, sourceId, sourceName) {
    return this.updateCollection(name, { id: sourceId, title: sourceName });
  }

  removeFavourite(name, sourceId) {
    if (this.hasCollection(name)) {
      const index = this.favAt(this.getCollection(name), sourceId);
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
      if (item.title === val) {
        charAt = index;
      }
      index += 1;
    });
    return charAt;
  }
}

export default Favourites;
