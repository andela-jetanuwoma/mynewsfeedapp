import _ from 'lodash'
class NewsArticle{
	constructor(){
      this.news = [];
	}

	add(title,description,meta,link,image){
      this.news.push({href:link,header:title,description:description,meta:meta,image:image});
	}

	search(title){
      const re = new RegExp(_.escapeRegExp(title), 'i');
      const isMatch = (result) => re.test(result.header);
      return _.filter(this.news, isMatch);
	}

	get(){
		return this.news;
	}

	total(){
		return this.news.length;
	}


}
export default NewsArticle;