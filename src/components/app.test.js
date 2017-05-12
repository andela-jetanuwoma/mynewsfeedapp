import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import App from './App';

describe("Main Wrapper component", () => {
 const wrapper = shallow(<App />)
 it('should contain a wrapper `div`', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
  it('should have 5 routes path defined', () => {
      expect(wrapper.find('Route').length).toBe(5);
  });
  it('should have '/' as the first route path', () => {
      expect(wrapper.find('Route').nodes[0].props.path).toBe('/');
  });
  it('should have "/discover" as the second route path', () => {
      expect(wrapper.find('Route').nodes[1].props.path).toBe('/discover');
  });
  it('should have "/articles/:id" as the third route path', () => {
      expect(wrapper.find('Route').nodes[2].props.path).toBe('/articles/:id');
  });
  it('should have "/collection/:id" as the fourth route path', () => {
      expect(wrapper.find('Route').nodes[3].props.path).toBe('/collection/:id');
  });
  it('should have "/logout" as the last route path', () => {
      expect(wrapper.find('Route').nodes[4].props.path).toBe('/logout');
  });

});
