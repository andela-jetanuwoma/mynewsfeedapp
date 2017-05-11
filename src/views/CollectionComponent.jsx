import React, { Component } from 'react';
import {
  Image,
  Card,
  Grid,
  Icon
} from 'semantic-ui-react';
import '../App.css';
import { Link } from 'react-router-dom';
import NewsStore from '../stores/NewsStore';
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

class CollectionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favourites: User.favourites(),
      name: this.props.match.params.id,
    };


    this.onChange = this.onChange.bind(this);
    this.getItemsState = this.getItemsState.bind(this);
  }

  componentDidMount() {
    AppActions.getCollectionNews(this.state.name);
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

  componentWillUnMount() {
    NewsStore.removeChangeListener(this.onChange);
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

export default CollectionComponent;