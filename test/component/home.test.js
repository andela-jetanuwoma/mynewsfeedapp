/* global describe it expect*/
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon'
import expect from 'expect';
import Home from '../../src/components/home';


const home = shallow(<Home />);
it('renders without crashing', () => {
  shallow(<Home />);
});


describe('Home component', () => {
  it('it should render div elements', () => {
    expect(home.find('div')).toExist;
  })
  it('it should render a h1 element for title', () => {
    expect(home.find('h1')).toExist
  })
});

sinon.spy(Home.prototype, 'componentWillMount');

describe('if component will mount function exists',() => {
  it('componentWillMount exists', () => {
    expect(Home.prototype.componentWillMount.calledOnce).toExist;
  });

})
