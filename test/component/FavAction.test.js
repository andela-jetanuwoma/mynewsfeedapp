/* global it describe */
import React from 'react';
import { mount, shallow, render } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import FavActions from '../../src/components/templates/FavActions';
import User from '../../src/models/User';

describe('FavActions', () => {
  const wrapper = mount(<FavActions id='jac-news' />);
  User.login({ name: 'Jude Peter', email: 'wapjude@gmail.com', imageUrl: '' });

  it('SourcesComponent renders Input', () => {
    const input = wrapper.find('input').first();
    expect(input.length).toEqual(1);
  });

  it('Should return initial empty collection', () => {
    expect(wrapper.node.state.collection).toEqual('');
  });

  it('should render The Form for adding favourites', () => {
    const component = shallow(<FavActions />);
    expect(component.find('Form').length).toBe(1);
  })

  it('Shoult add collection name and its favourite', () => {
    wrapper.instance().onChange(null, {name: "Tech", value: "Technology"})
    expect(wrapper.instance().state.Tech).toBe("Technology");
  });

  it('should add to users favourites when form is submitted', () => {
    const fakeEvent = {
      preventDefault: () => {return null},
    };

    wrapper.instance().handleSubmit(fakeEvent);
    expect(User.favourites().inFavourites("jac-news")).toBe(true);
  });

});

const fav = User.favourites();
fav.addCollection("Tech");
fav.addCollection("Science");
fav.addCollection("Education");
fav.addCollection("Events");


describe("FavActions render", () => {
  const renderHtml = render(<FavActions id='jac-news' />).html();
  const wrapper = mount(<FavActions id='jac-news' />);

  it('should return 4 as list of favourites rendered', () => {
    expect(wrapper.instance().state.collections.length).toBe(4);
  });

  it('should render the first collection', () => {
    expect(renderHtml.includes('<span class="text">Tech</span>')).toBe(true);
    expect(renderHtml.includes('<span class="text">Science</span>')).toBe(true);
    expect(renderHtml.includes('<span class="text">Education</span>')).toBe(true);
    expect(renderHtml.includes('<span class="text">Events</span>')).toBe(true);
  });
});
