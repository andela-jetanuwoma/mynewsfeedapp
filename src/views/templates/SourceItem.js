import React, { Component } from 'react';
import { Card, Button, Grid, Popup } from 'semantic-ui-react';
import FavActions from './FavActions';

class SourceItem extends Component {

  render() {
    const { source } = this.props;
    return (
      <Grid.Column width={5} >
        <Card>
          <Card.Content>
            <Card.Header>
              {source.title}
            </Card.Header>
            <Card.Description>
              {source.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Popup
                trigger={<Button
                  color="teal"
                  content=""
                  icon="heart"
                  label={{ as: 'a', basic: true, content: 'add' }}
                  labelPosition="right"
                />}
                flowing
                hoverable
              >
                <FavActions id={source.id} name={source.title} />
              </Popup>
            </div>
          </Card.Content>
        </Card>
      </Grid.Column>
    )
  }
}

export default SourceItem;
