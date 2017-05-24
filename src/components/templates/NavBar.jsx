import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';

class NavBar extends React.Component {
  render() {
    return (
      <Menu pointing inverted color="green">
        <Menu.Item name="NewsFeed" href="/discover" active={true} />
        <Menu.Menu position="right">
          <Menu.Item>
            <Dropdown
              trigger={this.props.trigger}
              options={this.props.options}
              pointing="top left"
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default NavBar;
