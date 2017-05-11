import _ from 'lodash';
/**
* A Model class that stores all Retreived news from Api
*/
class NewsArticle {
  /**
  * Set news to empty array
  */
  constructor() {
    this.news = [];
  }
/**
* Add article from api to news
* @param {string} title Article title
* @param {string} desc Article Description
* @param {string} author Article author
* @param {string} link Aritcle link
*/
  add(title, desc, author, link, img) {
    this.news.push({
      href: link,
      header: title,
      description: desc,
      meta: author,
      image: img,
    });
  }
  /**
   * Get the total number of news stored
   * @return {number}
   */
  total() {
    return this.news.length;
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

export default NewsArticle;
