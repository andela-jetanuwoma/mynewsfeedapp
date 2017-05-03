import React, { Component } from 'react';
import {
  Segment,
  Image,
  Icon,
  Header,
  Card,
  Grid,
  Dropdown } from 'semantic-ui-react';
import createHistory from 'history/createBrowserHistory';
import '../App.css';
import NewsStore from '../stores/NewsStore';
import AppActions from '../actions/AppActions';
import User from '../models/user';
import AppBar from './templates/AppBar';
import SideBar from './templates/SideBar';

const history = createHistory({
  forceRefresh: true,
});
const options = [
  {
    key: 'sign-out',
    text: 'Sign Out',
    icon: 'sign out',
    href: '/logout',
  },
];

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

class ArticlesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: User.favourites(),
    };
    this.onChange = this.onChange.bind(this);
    this.getItemsState = this.getItemsState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (!User.isLogin) {
      history.push('/');
    }
    AppActions.getNews(this.props.match.params.id);
  }

  componentDidMount() {
    NewsStore.addChangeListener(this.onChange);
  }


  onChange() {
    this.getItemsState();
  }

  getItemsState() {
    this.setState({
      news: NewsStore.getAll(),
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
    NewsStore.removeChangeListener(this.onChange);
  }

  render() {
    const { activepage } = this.state;
    const trigger = (
      <span>
        <Image avatar src={User.imageUrl} /> {User.name}
      </span>
    );
    const sorttypes = buildSortTypes(this.props.location.search);
    const { favourites } = this.state;
    return (
      <div>
        <AppBar trigger={trigger} options={options} />
        <Grid>
          <SideBar favourites={favourites} />
          <Grid.Column width={12} className="middleColumn">
            <div className="main">
              <p className="contentType">
                <span className="news_name">ABC News</span>
                <Dropdown
                  options={sorttypes}
                  onChange={this.handleChange}
                  inline
                />
              </p>
              <Card.Group itemsPerRow={3} className="container" items={this.state.news} />
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default ArticlesView;
