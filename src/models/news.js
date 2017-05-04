import _ from 'lodash';

class NewsArticle {
  constructor() {
    this.news = [];
  }

  add(title, desc, met, link, img) {
    this.news.push({
      href: link,
      header: title,
      description: desc,
      meta: met,
      image: img,
    });
  }

  total() {
    return this.news.length;
  }

  search(title) {
    const re = new RegExp(_.escapeRegExp(title), 'i');
    const isMatch = (result) => { return re.test(result.header); };
    return _.filter(this.news, isMatch);
  }

  get() {
    return this.news;
  }
}

export default NewsArticle;
