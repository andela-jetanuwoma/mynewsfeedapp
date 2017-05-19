import React, { Component } from 'react';
import {
  Image,
  Card,
  Grid,
  Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import newsStore from '../stores/NewsStore';
import actions from '../actions/actions';
import User from '../models/User';
import NavBar from './templates/NavBar';

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


    this.update = this.update.bind(this);
  }

  /**
   * componentDidMount - get favourites articles from saved collections and add a change listener
   * to know when articles has been added
   *
   * @return {void}
   */
  componentDidMount() {
    actions.getCollectionNews(this.state.name);
    newsStore.addChangeListener(this.update);
  }


  /**
   * update - listens to changes on news store
   * and update the states value
   * @return {void}
   */
  update() {
    this.setState({
      news: newsStore.getAll(),
      activepage: 'collection',
      name: this.props.match.params.id,
    });
  }

  /**
   * componentWillUnMount - remove change listener when component unmounts
   *
   * @return {void}
   */
  componentWillUnMount() {
    newsStore.removeChangeListener(this.update);
  }

  /**
   *  displayed rendered favourite articles
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
        <NavBar trigger={trigger} options={options} />
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
