import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon'
import expect from 'expect';
import ArticlesView from '../src/views/ArticlesView';
import App from '../src/controllers/App';
import Logout from '../src/views/Logout';


sinon.spy(ArticlesView.prototype, 'componentWillMount');



sinon.spy(ArticlesView.prototype, 'render');

describe('if render function exists',() => {
  it('render exists', () => {
    expect(ArticlesView.prototype.render.calledOnce).toExist;
  });



})
