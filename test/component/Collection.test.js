import React from 'react';
import { shallow, mount, render } from 'enzyme';
import expect from 'expect';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Collection from '../../src/components/Collection';
import User from '../../src/models/User';

describe('Collection Wrapper component', () => {
  User.Login({ name: 'Jude Peter', email: 'wapjude@gmail.com', imageUrl: '' });

  const fav = User.favourites();
  fav.addFavorites('Tech', 'abc-news', 'Abc News');
  fav.addFavorites('Science', 'tech-crunch', 'Tech Crunch');

  const wrapper = mount(<Collection match={{ params: { id: 'Tech' } }} />);
  const tempRender = render(<Collection match={{ params: { id: 'Tech' } }} />);

 it('should render successfully and load the AppBar', () => {
     expect(wrapper.find('AppBar').length).toBe(1);
  });

  it('should return Tech as the collection name', () => {
    console.log(wrapper.node.BrowserRouter);
    expect(wrapper.instance().props.match.params.id).toBe('Tech');
  });

  it('Should set active page to be collection', () => {
    wrapper.instance().setItemsState();
    expect(wrapper.instance().state.activepage).toBe("collection");
  });

  it('should manipulate item states', () => {
    wrapper.instance().state.name = "Science";
    wrapper.instance().state.activepage = "Article";
    expect(wrapper.instance().state.name).toBe("Science");
  });

 it('should reset state values', () => {
   wrapper.instance().onChange();
   wrapper.instance().componentWillUnMount();
   expect(wrapper.instance().state.name).toBe("Tech");
 });

});
