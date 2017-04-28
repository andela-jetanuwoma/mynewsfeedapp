import React, { Component } from 'react';
import _ from 'lodash';
import createHistory from 'history/createBrowserHistory';
import { Segment, Image, Icon, Header, Card, Search, Grid } from 'semantic-ui-react';
import NewsSourcesStore from '../stores/NewsSourcesStore';
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

class SourcesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activepage: 'discover',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.getItemsState = this.getItemsState.bind(this);
  }


  componentWillMount() {
    if (!User.isLogin) {
      history.push('/');
    }
    AppActions.getSources();
  }

  componentDidMount() {
    NewsSourcesStore.addChangeListener(this.onChange);
  }


  onChange() {
    this.getItemsState();
  }


  getItemsState() {
    this.setState({
      sources: NewsSourcesStore.getAll(),
      activepage: 'discover',
    });
  }

  componentWillUnMount() {
    NewsSourcesStore.removeChangeListener(this.onChange);
  }

  resetComponent() {
    this.setState({
      isLoading: false,
      results: [],
      value: '',
    });
  }

  handleSearchChange(e, val) {
    this.setState({
      isLoading: true,
      value: val,
    });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => { re.test(result.header); };
      this.setState({
        isLoading: false,
        results: _.filter(this.state.sources, isMatch),
      });
      return true;
    }, 500);
  }

  render() {
    const {
      isLoading,
      value,
       results,
     } = this.state;
    const trigger = (
      <span>
        <Image avatar src={User.imageUrl} /> {User.name}
      </span>
    );
    return (
      <div>
        <div>
          <AppBar trigger={trigger} options={options} />
          <Grid>
            <SideBar />
            <Grid.Column width={12} className="middleColumn">
              <div className="main">
                <p className="contentType">
                  <Icon name="rss" color="teal" />
                  Choose The News Sources Want To Read
               </p>
                <Search
                  className="container"
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={this.handleSearchChange}
                  results={results}
                  value={value}
                  fluid
                />
                <Card.Group itemsPerRow={4} className="container" items={this.state.sources} />
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }

}

export default SourcesView;
