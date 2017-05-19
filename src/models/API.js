/** @description Api helpper class for newsapi.org*/

const apiArticleLink = `https://newsapi.org/v1/articles?apiKey=${process.env.REACT_APP_API_KEY}`;

class Api {
  /** Set default api link to newsapi.ord*/
  constructor() {
    this.articlesUrl = apiArticleLink;
    this.newsApiUrl = 'https://newsapi.org/v1/sources?language=en';
  }
/**
* Add dynamic get parameters to Api link
* @param {string} type
* @param {string} value
* @return {void}
*/
  addQuery(type, value) {
    this.articlesUrl += `&${type}=${value}`;
  }
/**
* @description Remove Dynamic get parameters and reset link to default link to api
* @return {void}
*/
  clearQuery() {
    this.articlesUrl = apiArticleLink;
  }
/**
* Get Api link
* @return {string} Article Url
*/
  getLink() {
    return this.apiArticleLink;
  }
}

export default new Api();
