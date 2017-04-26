import _ from 'lodash'
class NewsSources{
	constructor(){
      this.sources = [];
	}

	add(id,name,description,sort){
      this.sources.push({href:"/articles/"+id+"?sort="+sort,header:name,description:description,title:name});
	}

	search(name){
      const re = new RegExp(_.escapeRegExp(name), 'i');
      const isMatch = (result) => re.test(result.header);
      return _.filter(this.sources, isMatch);
	}

	get(){
		return this.sources;
	}

	total(){
		return this.sources.length;
	}


}
export default NewsSources;
