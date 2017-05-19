import React from 'react';
import ReactDOM from 'react-dom';
import Sources from '../../src/models/Sources';

const sourcesModel = new Sources();
sourcesModel.add('abc-news', 'The ABC of all kiddo news', 'Want to learn how to read here you go', ['top']);
sourcesModel.add('tech-crunch', 'technology saga', ['top', 'latest']);

describe('news model', () => {
  it('should return total number of nsourcesModel as 3', () => {
    expect(sourcesModel.total()).toEqual(2);
  });

  it('should return The ABC of all kiddo news as the first source name', () => {
    expect(sourcesModel.get()[0].header).toEqual('The ABC of all kiddo news');
  });

  it('should return total number of sources that has `saga` in its title as 1', () => {
    expect(sourcesModel.search('saga').length).toBe(1);
  });
});
