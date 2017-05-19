/* global describe it*/
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import Articles from '../../src/components/Articles';

const allItems =
     [
      {
        "meta": "Sarah Buhr",
        "header": "Inside DevMountain’s sweet code school",
        "description": "This is the story of how a candy factory by the name of Startup became one of the few accredited code schools for startups 140 years later in the heart of..",
        "href": "https://techcrunch.com/2017/05/03/candy/",
        "image": "https://tctechcrunch2011.files.wordpress.com/2017/05/devmountain-classroom-edit.jpg?w=764&h=400&crop=1"
      },
      {
        "meta": "Peter Jude",
        "header": "The inside out of soccer",
        "description": "This is the story of how a candy factory by the name of Startup became one of the few accredited code schools for startups 140 years later in the heart of..",
        "href": "https://techcrunch.com/2017/05/03/inside-out/",
        "image": "https://tctechcrunch2011.files.wordpress.com/2017/05/devmountain-classroom-edit.jpg?w=764&h=400&crop=1"
      },
      {
        "meta": "Selena Gomes",
        "header": "Martial in the building",
        "description": "This is the story of how a candy factory by the name of Startup became one of the few accredited code schools for startups 140 years later in the heart of..",
        "href": "https://techcrunch.com/2017/05/03/martial/",
        "image": "https://tctechcrunch2011.files.wordpress.com/2017/05/devmountain-classroom-edit.jpg?w=764&h=400&crop=1"
      },
  ];
const sorts = ['top','latest'];

describe('Articleswrapper should mount', () => {
  const wrapper = mount(<Articles match={{ params: { id: 'abc-news' } }} location={{ search: '?sort=top,latest' }} />);
  wrapper.instance().setState({news: allItems, sortTypes: sorts});
  const renderedHtml = wrapper.render().html();

 it('should return abc-news as news id', () => {
   const id = wrapper.instance().getNewsId();
   expect(id).toBe('abc-news');
 });

 it('should return the total number of news articles as 3', () => {
  expect(wrapper.instance().state.news.length).toBe(3);
 });

 it('should return the rendered first sort type', () => {
   expect(renderedHtml.includes('<span class="text">top</span>')).toBe(true);
 });

 it('should return the rendered second sort type', () => {
   expect(renderedHtml.includes('<span class="text">latest</span>')).toBe(true);
 });

 it('should return false undefined sort type', () => {
   expect(renderedHtml.includes('<span class="text">jude</span>')).toBe(false);
 });

 it('should render the first article title', () => {
   expect(renderedHtml.includes('<div class="header">Inside DevMountain&#x2019;s sweet code school</div>')).toBe(true);
 });

 it('should render the second article title', () => {
   expect(renderedHtml.includes('<div class="header">The inside out of soccer</div>')).toBe(true);
 });

 it('should render the third article title', () => {
   expect(renderedHtml.includes('<div class="header">Martial in the building</div>')).toBe(true);
 });

 it('should reset state values when onChange is called', () => {
   wrapper.instance().onChange();
   wrapper.instance().componentWillUnMount();
   expect(wrapper.instance().state.news.length).toBe(0);
 });

});


sinon.spy(Articles.prototype, 'componentWillMount');
sinon.spy(Articles.prototype, 'componentDidMount');
describe('if component will mount function exists', () => {
  it('componentWillMount exists', () => {
    expect(Articles.prototype.componentWillMount.calledOnce).toExist;
  });
  it('componentDidMount exists', () => {
    expect(Articles.prototype.componentDidMount.calledOnce).toExist;
  });
});
