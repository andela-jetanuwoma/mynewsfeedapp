import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import CollectionComponent from './CollectionComponent';

describe("CollectionComponent Wrapper component", () => {
 const wrapper = shallow(<CollectionComponent match={{ params: { id: 'Tech' } }} />)
 it('should contain a wrapper `div`', () => {
    expect(wrapper.find('div').length).toBe(2);
  });


});
