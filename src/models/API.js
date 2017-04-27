class API {
  constructor() {
    this.linkString = "https://newsapi.org/v1/articles?apiKey=213327409d384371851777e7c7f78dfe";
    this.apilink = "https://newsapi.org/v1/sources?language=en";
    this.link = this.linkString;
  }

  addQuery(type,value) {
    this.linkString += `&${type}=${value}`;
  }

  clearQuery() {
    this.link = this.linkString;
  }

  getLink() {
    return this.link;
  }
}

export default new API();
