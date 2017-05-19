import React from 'react';
import {
  Image,
  Grid,
  Dropdown, Icon } from 'semantic-ui-react';
import newsStore from '../stores/NewsStore';
import AppActions from '../actions/AppActions';
import AppBar from './templates/AppBar';
import SideBar from './templates/SideBar';
import Article from './templates/Article';
import BaseApp from './BaseApp';

/**
 * extract news sort types from the url
 */
const buildSortTypes = (type) => {
  const types = type.substr(6, type.length - 1).split(',');
  const option = [];
  let inc = 1;
  types.forEach((sort) => {
    option.push({
      key: inc,
      text: sort,
      value: sort,
    });
    inc += 1;
  });
  return option;
};

/**
 * @description This class lists all articles of a specfic source
 * @extends BaseApp
 */
class Articles extends BaseApp {

  /**
   * constructor - set default states
   *
   * @param  {object} props
   * @return {void}
   */
  constructor(props) {
    super(props);


    this.state = {
      favourites: this.user.favourites(),
      news: [],
    };


    this.onChange = this.onChange.bind(this);
    this.setItemsState = this.setItemsState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * componentWillMount - make a call to super componentWillMount
   * to redirect the user to welcome page if not logged in
   * @return {void}
   */
  componentWillMount() {
    super.componentWillMount();
  }

  /**
   * componentDidMount - add change listener
   *  And make a call to the
   * @return {void}
   */
  componentDidMount() {
    AppActions.getNews(this.props.match.params.id);
    newsStore.addChangeListener(this.onChange);
  }

/* Called when news change to set the new news state*/
  onChange() {
    this.setItemsState();
  }

  /**
   * setItemsState - Set the default state
   *
   * @return {void}
   */
  setItemsState() {
    this.setState({
      news: newsStore.getAll(),
      activePage: 'feeds',
      sortTypes: [],
    });
  }

  /**
   * getNewsId - Return the news source id
   *
   * @return {string}  news source id
   */
  getNewsId() {
    return this.props.match.params.id;
  }

  /**
   * handleChange - handles sort type changes and fetch accordingly
   *
   * @param  {event} e
   * @param  {string} { value } Sort type value
   * @return {void}
   */
  handleChange(e, { value }) {
    AppActions.getNews(this.props.match.params.id, value);
  }

  /**
   * componentWillUnMount - removes change listener
   *
   * @return {void}
   */
  componentWillUnMount() {
    newsStore.removeChangeListener(this.onChange);
  }

  /**
   * render - displayed the articles
   */
  render() {

    const trigger = (
      <span>
        <Image avatar src={this.user.imageUrl} /> {this.user.name}
      </span>
    );

    const sortTypes = buildSortTypes(this.props.location.search);
    const { favourites } = this.state;
    return (
      <div>
        <AppBar trigger={trigger} options={this.menuOptions} />
        <Grid>
          <SideBar favourites={favourites} />
          <Grid.Column width={12} className="middleColumn">
            <div className="main">
              <p className="contentType">
                <span className="news_name">News Feed</span>
                <Dropdown
                  options={sortTypes}
                  onChange={this.handleChange}
                  inline
                />
              </p>
              <Grid className="sources">
                {this.state.news.map((article, index) => {
                  return (<Article article={article} key={index} />)
                })}
              </Grid>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Articles;
