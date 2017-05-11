import React from 'react';
import ReactDOM from 'react-dom';
import API from './API';

it('should return api link for all sources as https://newsapi.org/v1/sources?language=en', () =>{
  expect(API.apilink).toEqual("https://newsapi.org/v1/sources?language=en");
});

it('should return  link for all sources as https://newsapi.org/v1/sources?language=en', () =>{
  expect(API.apilink).toEqual("https://newsapi.org/v1/sources?language=en");
});

it('should return link with get proper parameters', () =>{
  API.addQuery("source","jude")
  expect(API.link).toEqual("https://newsapi.org/v1/articles?apiKey=213327409d384371851777e7c7f78dfe&source=jude");
});

it('should return link with get proper parameters', () =>{
  API.addQuery("match","andela")
  expect(API.link).toEqual("https://newsapi.org/v1/articles?apiKey=213327409d384371851777e7c7f78dfe&source=jude&match=andela");
});

it('should return remove all get parameters after clearing', () =>{
  API.clearQuery()
  expect(API.link).toEqual("https://newsapi.org/v1/articles?apiKey=213327409d384371851777e7c7f78dfe");
});

it('should return the article link', () =>{
  expect(API.getLink()).toEqual("https://newsapi.org/v1/articles?apiKey=213327409d384371851777e7c7f78dfe");
});
