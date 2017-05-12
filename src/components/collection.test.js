import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Collection from './collection';

describe("Collection Wrapper component", () => {
 const wrapper = shallow(<Collection match={{ params: { id: 'Tech' } }} />)
 it('should contain a wrapper `div`', () => {
    expect(wrapper.find('div').length).toBe(2);
  });


});
