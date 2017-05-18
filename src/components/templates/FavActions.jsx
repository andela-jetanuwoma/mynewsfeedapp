import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import User from '../../models/User';
import appDispatcher from '../../dispatcher/AppDispatcher';
import AppConstants from '../../constants/AppConstants';

class FavActions extends Component {
  constructor() {
    super()
    this.state = { collection: '', newCollection: '' }


    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e, { name, value }) {
    this.setState({[name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, id } = this.props;
    const { collection, newCollection } = this.state;

    User.favourites().addFavorites(collection === ''? newCollection: collection, id, name);

    appDispatcher.dispatch({
      eventName: AppConstants.GET_FAVOURITES,
    });
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
        <Form.Input
         type="text"
         name="newCollection"
         label="Create A Collection"
         onChange={this.onChange}
        />
        <Form.Select
          onChange={this.onChange}
          name="collection" label="Choose A Collection"
          options={options} placeholder="Select Existing"
        />
        <Form.Input type="hidden" value={id} />
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

export default FavActions;
