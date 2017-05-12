/* global describe it*/
import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import Articles from './articles';

const allItems =
{
    "status": "ok",
    "source": "techcrunch",
    "sortBy": "top",
    "articles": [
      {
        "author": "Sarah Buhr",
        "title": "Inside DevMountain’s sweet code school",
        "description": "This is the story of how a candy factory by the name of Startup became one of the few accredited code schools for startups 140 years later in the heart of..",
        "url": "https://techcrunch.com/2017/05/03/candy/",
        "urlToImage": "https://tctechcrunch2011.files.wordpress.com/2017/05/devmountain-classroom-edit.jpg?w=764&h=400&crop=1",
        "publishedAt": "2017-05-03T19:59:25Z"
      },
      {
      "author": "Darrell Etherington",
      "title": "Intel’s new Silicon Valley Autonomous Driving Garage is primed for partnerships",
      "description": "The autonomous tech development facility is actually one of four garages Intel maintains globally, including one in Arizona, one in Portland, and one in..",
      "url": "https://techcrunch.com/2017/05/03/intels-new-silicon-valley-autonomous-driving-garage-is-primed-for-partnerships/",
      "urlToImage": "https://tctechcrunch2011.files.wordpress.com/2017/05/intel-autonomous-driving-garage147a1048.jpg?w=764&h=400&crop=1",
      "publishedAt": "2017-05-04T01:40:39Z"
    }
  ],
};
describe('Articleswrapper', () => {
 const wrapper = shallow(<Articles match={{ params: { id: 'abc-news' } }} location={{ search: '?sort=top,latest' }} />);
  it('should contain a wrapper `div`', () => {
    expect(wrapper.find('AppBar').length).toBe(1);
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
