import React, { Component } from 'react';
import {
  Image,
  Card,
  Grid,
  Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import newsStore from '../stores/NewsStore';
import AppActions from '../actions/AppActions';
import User from '../models/user';
import AppBar from './templates/AppBar';

const options = [
  {
    key: 'sign-out',
    text: 'Sign Out',
    icon: 'sign out',
    href: '/logout',
  },
];

class Collection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favourites: User.favourites(),
      name: this.props.match.params.id,
    };


    this.onChange = this.onChange.bind(this);
    this.setItemsState = this.setItemsState.bind(this);
  }

  componentDidMount() {
    AppActions.getCollectionNews(this.state.name);
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

  componentWillUnMount() {
    newsStore.removeChangeListener(this.onChange);
  }

  render() {

    const trigger = (
      <span>
        <Image avatar src={User.imageUrl} /> {User.name}
      </span>
    );

    const { name } = this.state;

    return (
      <div>
        <AppBar trigger={trigger} options={options} />
        <Grid>
          <Grid.Column width={16} className="middleColumn">
            <div className="main">
              <p className="contentType">
              <Link to="/discover" >  <Icon name='arrow circle left' size="big"  /> </Link>
                <span className="news_name">{name}</span>
              </p>
              <Card.Group itemsPerRow={3} className="container" items={this.state.news} />
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Collection;
