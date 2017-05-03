import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import User from '../../models/user';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppConstants from '../../constants/AppConstants';

class FavActions extends Component {
  constructor() {
    super()
    this.state = { collection: '' }
    this.formData = this.formData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    console.log(this);
  }

  onChange(e, { name, value }) {
    this.setState({ collection: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, id } = this.props;
    const { collection } = this.state;
    User.favourites().addFavorites(collection, id, name);
    AppDispatcher.dispatch({
      eventName: AppConstants.GET_FAVOURITES,
    });
  }

  formData() {
    console.log(this);
  }
  render() {
    const { id } = this.props;
    const collections = User.favourites().getCollections();
    const options = [];
    collections.forEach((coll) => {
      options.push({ key: coll, text: coll, value: coll });
    })
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Select onChange={this.onChange} name='collections' label="Choose A Collection" options={options} placeholder="Select Existing" />
        <Form.Input   type='hidden' value={id} />
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

export default FavActions;
