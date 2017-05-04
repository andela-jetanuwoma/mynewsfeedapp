import React from 'react';
import _ from 'lodash';
import { Grid, List } from 'semantic-ui-react';
import FavouritesStore from '../../stores/FavouritesStore';
import User from '../../models/user';

class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      favourites: User.favourites(),
    };
    this.onChange = this.onChange.bind(this);
    this.getItemsState = this.getItemsState.bind(this);
  }

  componentDidMount() {
    FavouritesStore.addChangeListener(this.onChange);
  }

  onChange() {
    this.getItemsState();
  }

  getItemsState() {
    this.setState({ favourites: User.favourites() });
  }

  componentWillUnMount() {
    FavouritesStore.removeChangeListener(this.onChange);
  }

  render() {
    const { favourites } = this.state;
    return (
      <Grid.Column width={4} className="leftColumn">
        <div className="favHolder">
          <h3>Favourites</h3>
          <List>
            {favourites.getCollections().map((value, index) => {
              return (
                <List.Item key={index}>
                  <List.Icon name="bookmark" />
                  <List.Content>
                    <List.Header>{value}</List.Header>
                    <List.List>
                      {favourites.fetchAll()[value].map((fav, i) => {
                        return (
                          <List.Item key={i} >
                            <List.Icon name="pin" />
                            <List.Content>
                              <List.Header>{fav.title}</List.Header>
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
