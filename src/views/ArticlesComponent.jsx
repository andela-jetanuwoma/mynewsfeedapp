import React from 'react';
import {
  Image,
  Grid,
  Dropdown, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../App.css';
import newsStore from '../stores/NewsStore';
import AppActions from '../actions/AppActions';
import AppBar from './templates/AppBar';
import SideBar from './templates/SideBar';
import Article from './templates/Article';
import BaseApp from './BaseApp';

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

class ArticlesComponent extends BaseApp {
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

  componentWillMount() {
    super.componentWillMount();

    AppActions.getNews(this.props.match.params.id);
  }

  componentDidMount() {
    newsStore.addChangeListener(this.onChange);
  }


  onChange() {
    this.setItemsState();
  }

  setItemsState() {
    this.setState({
      news: newsStore.getAll(),
      activepage: 'feeds',
      sorttypes: [],
    });
  }

  getNewsId() {
    return this.props.match.params.id;
  }

  handleChange(e, { value }) {
    AppActions.getNews(this.props.match.params.id, value);
  }

  componentWillUnMount() {
    newsStore.removeChangeListener(this.onChange);
  }

  render() {

    const trigger = (
      <span>
        <Image avatar src={this.user.imageUrl} /> {this.user.name}
      </span>
    );

    const sorttypes = buildSortTypes(this.props.location.search);
    const { favourites } = this.state;

    return (
      <div>
        <AppBar trigger={trigger} options={this.menuOptions} />
        <Grid>
          <SideBar favourites={favourites} />
          <Grid.Column width={12} className="middleColumn">
            <div className="main">
              <p className="contentType">
                <Link to="/discover" >  <Icon name='arrow circle left' size="big"  /> </Link>
                <span className="news_name">News Feed</span>
                <Dropdown
                  options={sorttypes}
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

export default ArticlesComponent;
