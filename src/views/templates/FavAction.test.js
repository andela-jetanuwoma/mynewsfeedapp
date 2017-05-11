/* global it describe */
import React from 'react';
import { mount, shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import FavActions from '../src/views/templates/FavActions';

describe('FavActions', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<FavActions />);
  });

  it('SourcesComponent renders Input', () => {
    const input = wrapper.find('input').first();
    expect(input.length).toEqual(1);
  });

  it('Should allow us get state', () => {
    expect(wrapper.node.state.collection).toEqual('');

  });

  it('should render The Form for adding favourites', () => {
    const component = shallow(<FavActions />);
    expect(component.find('Form').length).toBe(1);
  })
});
