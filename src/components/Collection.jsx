import React, { Component } from 'react';
import {
  Image,
  Card,
  Grid,
  Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import newsStore from '../stores/NewsStore';
import appActions from '../actions/AppActions';
import User from '../models/User';
import AppBar from './templates/AppBar';

const options = [
  {
    key: 'sign-out',
    text: 'Sign Out',
    icon: 'sign out',
    href: '/logout',
  },
];

/**
 * displayed  all favourites articles save in all collection
 */
class Collection extends Component {


  /**
   * constructor - Set default state values
   *
   * @param  {object} props passed props into this component
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      favourites: User.favourites(),
      name: this.props.match.params.id,
    };


    this.onChange = this.onChange.bind(this);
    this.setItemsState = this.setItemsState.bind(this);
  }

  /**
   * componentDidMount - get favourites articles from saved collections and add a change listener
   * to know when articles has been added
   *
   * @return {void}
   */
  componentDidMount() {
    appActions.getCollectionNews(this.state.name);
    newsStore.addChangeListener(this.onChange);
  }


  /**
   * onChange - listened to changes to aritcles
   *
   * @return {void}
   */
  onChange() {
    this.setItemsState();
  }

  /**
   * setItemsState - set default items values
   *
   * @return {void}
   */
  setItemsState() {
    this.setState({
      news: newsStore.getAll(),
      activepage: 'collection',
      name: this.props.match.params.id,
    });
  }

  /**
   * componentWillUnMount - remove change listener
   *
   * @return {void}
   */
  componentWillUnMount() {
    newsStore.removeChangeListener(this.onChange);
  }

  /**
   *   displayed rendered favourite articles
   */

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
