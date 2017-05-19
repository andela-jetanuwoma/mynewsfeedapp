import React, { Component } from 'react';
import { Card, Button, Grid, Popup } from 'semantic-ui-react';
import CollectionForm from './CollectionForm';
import User from '../../models/User';
import favouritesStore from '../../stores/FavouritesStore';

class Source extends Component {
  constructor() {
    super();

    this.state = {
      favourites: User.favourites(),
    };

    this.update = this.update.bind(this);
    this.setItemsState = this.setItemsState.bind(this);
  }

  componentDidMount() {
    favouritesStore.addChangeListener(this.update);
  }

  update() {
    this.setItemsState();
  }

  setItemsState() {
    this.setState({ favourites: User.favourites() });
  }

  componentWillUnMount() {
    favouritesStore.removeChangeListener(this.update);
  }
  render() {
    const { source } = this.props;
    const { favourites } = this.state;
    return (
      <Grid.Column width={5} >
        <Card href={source.href}>
          <Card.Content>
            <Card.Header>
              {source.title}
            </Card.Header>
            <Card.Description>
              {source.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {(() => {
              if (favourites.inFavourites(source.id)) {
                return (
                  <div className="ui buttons">
                    <Button
                      color="green"
                      content=""
                      icon="heart"
                      labelPosition="right"
                      fluid
                    />
                  </div>
                );
              } else {
                return (
                  <div className="ui buttons">
                    <Popup
                      trigger={<Button
                        color="teal"
                        content=""
                        icon="heart"
                        fluid
                        labelPosition="right"
                      />}
                      flowing
                      hoverable
                    >
                      <CollectionForm id={source.id} name={source.title} />
                    </Popup>
                  </div>
                );
              }
            })()}
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  }
}

export default Source;
