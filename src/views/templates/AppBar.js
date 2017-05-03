import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';

class AppBar extends React.Component {
  render() {
    return (
      <Menu pointing inverted>
        <Menu.Item name="NewsFeed" active={true} />
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

export default AppBar;
