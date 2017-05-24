/* global it describe */
import React from 'react';
import { mount, shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import SourcesList from '../../src/components/SourcesList';

describe('SourcesList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<SourcesList />);
  });

  it('SourcesList renders Input', () => {
    const input = wrapper.find('input').first();
    expect(input.length).toEqual(1);
  });

  it('Should allow us get state', () => {
    expect(wrapper.node.state.sources).toEqual([]);
  });

  it('should render The NavBar ', () => {
    const component = shallow(<SourcesList />);
    expect(component.find('NavBar').length).toBe(1);
  })
});

describe('SourcesList should be displayed', () => {
  let wrapper;
  const sources = [
    { title: 'Abc news',
    description: 'The best News so far',
    href: 'http://abcnews.net',
    id: 'abc-news'
  },
  { title: 'Cnn news',
  description: 'The second best News so far',
  href: 'http://cnnnews.net',
  id: 'cnn-news'
}
  ];

  beforeEach(() => {
    wrapper = mount(<SourcesList  />);
  });

  it('Should allow us to set props', () => {
    wrapper.setState({ sources: sources });
    expect(wrapper.node.state.sources.length).toEqual(2);
  });

});
