import React from 'react';
import { Grid, Menu, Icon } from 'semantic-ui-react';

class SideBar extends React.Component {
  render() {
    return (
      <Grid.Column width={4} className="leftColumn">
        <div className="favHolder">
          <h3>Favourites</h3>
          <Menu vertical fluid>
            <Menu.Item name="inbox">
              <Icon disabled name="trash" color="red" size="large" />
                Abc News
            </Menu.Item>
            <Menu.Item name="spam" >
              <Icon disabled name="trash" color="red" size="large" />
                The Sport Tycoon
            </Menu.Item>
            <Menu.Item name="updates">
              <Icon disabled name="trash" color="red" size="large" />
                Some rubbish news you save
            </Menu.Item>
          </Menu>
        </div>
      </Grid.Column>
    );
  }
}

export default SideBar;
