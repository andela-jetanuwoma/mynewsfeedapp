import React, { Component } from 'react';
import { Card, Button, Grid, Popup } from 'semantic-ui-react';
import FavActions from './FavActions';
import User from '../../models/user';
import favouritesStore from '../../stores/favouritesStore';

class SourceItem extends Component {
  constructor() {
    super();
    this.state = {
      favourites: User.favourites(),
    };
    this.onChange = this.onChange.bind(this);
    this.getItemsState = this.getItemsState.bind(this);
  }

  componentDidMount() {
    favouritesStore.addChangeListener(this.onChange);
  }

  onChange() {
    this.getItemsState();
  }

  getItemsState() {
    this.setState({ favourites: User.favourites() });
  }

  componentWillUnMount() {
    favouritesStore.removeChangeListener(this.onChange);
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
                      <FavActions id={source.id} name={source.title} />
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

export default SourceItem;
