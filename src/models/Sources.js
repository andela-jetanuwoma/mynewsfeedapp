import _ from 'lodash';

/**
 * A Model class that stores all Retreived news sources from Api
 */
class Sources {

  /**
   * constructor - Sources constructor
   *
   * @return {void}  set news initially to empty array
   */
  constructor() {
    this.sources = [];
  }

  /**
   * add - description
   *
   * @param  {string} id   The source ID
   * @param  {string} name the source name
   * @param  {string} desc the source description
   * @param  {string} sort the source available sort types
   * @return {void}
   */
  add(id, name, desc, sort) {
    this.sources.push({
      href: `/articles/${id}?sort=${sort}`,
      header: name,
      description: desc,
      title: name,
      id: id,
    });
  }

  /**
   * search - Searches for sources from the lists of sources added
   *
   * @param  {string} name Source title
   * @return {array}      Search results
   */
  search(name) {
    const re = new RegExp(_.escapeRegExp(name), 'i');
    const isMatch = (result) => { re.test(result.header); };
    return _.filter(this.sources, isMatch);
  }

  /**
   * get - Get the total of news sources added
   *
   * @return {array}
   */
  get() {
    return this.sources;
  }

  /**
   * total - Total number of news
   *
   * @return {Number}  Total news added
   */
  total() {
    return this.sources.length;
  }

}
export default Sources;
