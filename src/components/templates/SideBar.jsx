import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, List } from 'semantic-ui-react';
import favouritesStore from '../../stores/FavouritesStore';
import User from '../../models/User';

class SideBar extends React.Component {
  constructor() {
    super();

    this.state = {
      favourites: User.favourites(),
    };


    this.onChange = this.onChange.bind(this);
    this.setItemsState = this.setItemsState.bind(this);
  }

  componentDidMount() {
    favouritesStore.addChangeListener(this.onChange);
  }

  onChange() {
    this.setItemsState();
  }

  setItemsState() {
    this.setState({ favourites: User.favourites() });
  }

  componentWillUnMount() {
    favouritesStore.removeChangeListener(this.onChange);
  }

  render() {
    const { favourites } = this.state;

    return (
      <Grid.Column width={3} className="leftColumn">
        <div className="favHolder">
          <h3>Favourites</h3>
          <List>
            {favourites.getCollections().map((value, index) => {
              return (
                <List.Item key={index} >
                  <List.Icon name="bookmark" />
                  <List.Content>
                    <List.Header><Link to={`/collection/${value}`} >{value}</Link></List.Header>
                    <List.List>
                      {favourites.fetchAll()[value].map((favourite, index) => {
                        return (
                          <List.Item key={index} >
                            <List.Icon name="pin" />
                            <List.Content>
                              <List.Header>{favourite.title}</List.Header>
                            </List.Content>
                          </List.Item>
                        )
                      })}
                    </List.List>
                  </List.Content>
                </List.Item>
              )
            })}
          </List>
        </div>
      </Grid.Column>
    );
  }
}

export default SideBar;
