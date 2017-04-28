import React, { Component } from 'react';
import { Grid, Menu, Dropdown, Icon, Image, Header } from 'semantic-ui-react';
import '../App.css';
import '../assets/style/App.css';
import User from '../models/user';

const trigger = (
  <span>
    <Image avatar src={User.imageUrl} /> {User.name}
  </span>
);
const options = [
  {
    key: 'sign-out',
    text: 'Sign Out',
    icon: 'sign out',
    href: '/logout',
  },
];
class Template extends Component {
  componentWillMount() {
    console.log(this);
  }
  constructor(props) {
    super(props);
    this.page = '';
  }
  render() {
    return (
      <div>

      <Grid>

         
      </Grid>

      </div>
  );
  }
}

export default Template;
