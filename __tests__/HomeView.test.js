import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon'
import expect from 'expect';
import HomeView from '../src/views/HomeView';
import App from '../src/controllers/App';
import Logout from '../src/views/Logout';

const home = shallow(<HomeView />);
it('renders without crashing', () => {
  shallow(<HomeView />);
});



describe('Home View component',() => {

    it('it should render div elements', () => {
        expect(home.find('div')).toExist
    })
    it('it should render a h1 element for title', () => {
        expect(home.find('h1')).toExist
    })
});

sinon.spy(HomeView.prototype, 'componentWillMount');

describe('if component will mount function exists',() => {
  it('componentWillMount exists', () => {
    expect(HomeView.prototype.componentWillMount.calledOnce).toExist;
  });

})

it('renders without crashing', () => {
  shallow(<App />);
});

sinon.spy(App.prototype, 'render');

describe('if render function exists',() => {
  it('render exists', () => {
    expect(App.prototype.render.calledOnce).toExist;
  });



})
