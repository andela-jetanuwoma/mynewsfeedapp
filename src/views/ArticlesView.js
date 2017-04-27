import React, { Component } from 'react';
import {
  Sidebar,
  Segment,
  Menu,
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

    };
    this.onChange = this.onChange.bind(this);
    this.getItemsState = this.getItemsState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (!User.isLogin) {
      history.push('/');
    }
    console.log(this.props.match.params.id);
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
    return (
      <div>

        <Sidebar.Pushable as={Segment}>
          <Sidebar.Pusher>
            <Menu pointing>
              <Menu.Item name={activepage} active={true} />
              <Menu.Menu position="right">
                <Menu.Item>
                  <Dropdown trigger={trigger} options={options} pointing="top left" icon={null} />
                </Menu.Item>
              </Menu.Menu>
            </Menu>
            <Segment basic>
              <div className="container">
                <Grid>
                  <Grid.Column width={4}>
                    <Header as="h2" icon>
                      <Icon name="rss" color="teal" />
                         News Feeds

                     </Header>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Dropdown
                      fluid
                      selection
                      className="sortas"
                      options={sorttypes}
                      placeholder="Sort By"
                      onChange={this.handleChange}
                    />
                  </Grid.Column >
                </Grid>

                <Card.Group itemsPerRow={4} className="container" items={this.state.news} />
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>

      </div>
    );
  }
}

export default ArticlesView;
