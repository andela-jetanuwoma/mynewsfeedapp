import React, { Component } from 'react';
import _ from 'lodash';
import createHistory from 'history/createBrowserHistory';
import { Segment, Menu, Image, Icon, Header, Card, Search, Dropdown } from 'semantic-ui-react';
import NewsSourcesStore from '../stores/NewsSourcesStore';
import AppActions from '../actions/AppActions';
import User from '../models/user';
import '../App.css';

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
      activepage,
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
        <div onLoad={AppActions.getSources()}>
          <Menu pointing>
            <Menu.Item name={activepage} active={activepage === 'discover'} />
            <Menu.Item name="Feeds" active={activepage === 'feeds'} />
            <Menu.Menu position="right">
              <Menu.Item>
                <Dropdown trigger={trigger} options={options} pointing="top left" icon={null} />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <Segment basic>
            <div className="container">
              <Header as="h2" icon>
                <Icon name="rss" color="teal" />
            News Sources
           </Header>
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
          </Segment>
        </div>
      </div>
    );
  }

}

export default SourcesView;
