import React from 'react';
import ReactDOM from 'react-dom';
import News from '../../src/models/News';

const newsModel = new News();
newsModel.add('obasanjo join barcelona', 'in his quest for medal obasanjo joins barcelona and team up with suarez', 'sport', 'goal.com', 'image.jpg');
newsModel.add('Messi is pregnant', 'The news came in after hes two goals against madrid, though the mother of the child is still missing', 'sport', 'goal.com', 'image.jpg');
newsModel.add('Bayo displaces Mark', 'the new andela faciltator out ran the facebook ceo in 200 meter race though news source is yet to be confirm', 'tech', 'unconfirm', 'bayo.jpg');

describe('news model', () => {
  it('should return total number of news as 3', () => {
    expect(newsModel.total()).toEqual(3);
  });

  it('should return obasanjo join barcelona as the first news title', () => {
    expect(newsModel.get()[0].header).toEqual('obasanjo join barcelona');
  });

  it('should return Messi is pregnant as the second news title', () => {
    expect(newsModel.get()[1].header).toEqual('Messi is pregnant');
  });

  it('should return total number of news that has `a` in its title as 3', () => {
    expect(newsModel.search('a').length).toBe(3);
  });

  it('should retun 1 for total number of search using obasanjo as search case', () => {
    expect(newsModel.search('obasanjo').length).toBe(1);
  });
});
