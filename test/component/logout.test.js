/* global it describe */
import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import Logout from '../../src/components/logout';

describe('Logout Wrapper component', () => {
  sinon.spy(Logout.prototype, 'componentWillMount');
  const wrapper = shallow(<Logout />)
  it('componentWillMount exists', () => {
    expect(Logout.prototype.componentWillMount.calledOnce).toExist;
  });
});
