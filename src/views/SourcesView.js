import React, { Component } from 'react';
import _ from 'lodash';
import createHistory from 'history/createBrowserHistory';
import { Image, Icon, Search, Grid } from 'semantic-ui-react';
import NewsSourcesStore from '../stores/NewsSourcesStore';
import AppActions from '../actions/AppActions';
import User from '../models/user';
import AppBar from './templates/AppBar';
import SideBar from './templates/SideBar';
import SourceItem from './templates/SourceItem';

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
      sources: NewsSourcesStore.getAll(),
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
      const isMatch = (result) => { return re.test(result.header); };
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
    const { favourites } = this.props;
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
            <SideBar favourites={favourites} />
            <Grid.Column width={12} className="middleColumn">
              <div className="main">
                <p className="contentType">
                  <Icon name="rss" color="teal" />
                  Choose The News Source Want To Read
               </p>
                <Search
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={this.handleSearchChange}
                  results={results}
                  value={value}
                  fluid
                  className="search_sources"
                />

                <Grid className="sources">
                  {this.state.sources.map((source, index) => {
                    return (<SourceItem source={source} key={index} />)
                  })}
                </Grid>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }

}

export default SourcesView;
