import _ from 'lodash';
/**
* A Model class that stores all Retreived news from Api
*/
class News {
  /**
  * Set news to empty array
  */
  constructor() {
    this.news = [];
  }
/**
* Add article from api to news
* @param {string} title Article title of the article
* @param {string} description Article short description of the article
* @param {string} author Article author
* @param {string} link Aritcle link to the main article
*/
  add(title, description, author, link, image) {
    this.news.push({
      href: link,
      header: title,
      description,
      meta: author,
      image,
    });
  }


/**
 * search - Search for news Article
 *
 * @param  {string} title Search news by title
 * @return {array} array of searches that meet criteria
 */
  search(title) {
    const re = new RegExp(_.escapeRegExp(title), 'i');
    const isMatch = (result) => { return re.test(result.header); };
    return _.filter(this.news, isMatch);
  }

  /**
   * get - Returns total news
   *
   * @return {array}  total news added
   */
  get() {
    return this.news;
  }
}

export default News;
