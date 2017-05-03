import React from 'react';
import { Grid, Menu, Icon, Accordion } from 'semantic-ui-react';

class SideBar extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <Grid.Column width={4} className="leftColumn">
        <div className="favHolder">
          <h3>Favourites</h3>
          <Accordion exclusive={false}>

          </Accordion>
        </div>
      </Grid.Column>
    );
  }
}

export default SideBar;
