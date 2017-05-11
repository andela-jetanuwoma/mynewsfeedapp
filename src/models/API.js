/** @description Api helpper class for newsapi.org*/
class API {
  /** Set default api link to newsapi.ord*/
  constructor() {
    this.linkString = `https://newsapi.org/v1/articles?apiKey=${process.env.REACT_APP_API_KEY}`;
    this.apilink = 'https://newsapi.org/v1/sources?language=en';
    this.link = this.linkString;
    
  }
/**
* Add dynamic get parameters to Api link
* @param {string} type
* @param {string} value
* @return {string}
*/
  addQuery(type, value) {
    this.link += `&${type}=${value}`;
  }
/**
* @description Remove Dynamic get parameters and reset link to default link to api
*/
  clearQuery() {
    this.link = this.linkString;
  }
/**
* Get Api link
* @return {string}
*/
  getLink() {
    return this.link;
  }
}

export default new API();
