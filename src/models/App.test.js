import React from 'react';
import ReactDOM from 'react-dom';
import User from './user';
import NewsArticle from './news';
import NewsSources from './sources';

const uservalue = { name: "jude peter", email: "wapjude@gmail.com", imageUrl: "some_picture.jpg"};
User.Login(uservalue);

it('should log user in when values is supplied and store it', () => {
    expect(User.isLoggedIn()).toBe(true);
});

it('should return jude peter as the name of the logged in user', () => {
    expect(User.name).toEqual("jude peter");
});

it('should return wapjude@gmail.com as the logged in user', () => {
    expect(User.email).toEqual("wapjude@gmail.com");
});

it('should return some_picture.jpg as logged in', () => {
    expect(User.imageUrl).toEqual("some_picture.jpg");
});

it('should log user out and remove all user details', () => {
    expect(User.logOut()).toBe(true);
});
it('should be undefined for user name', () => {
    expect(User.name).toBe("");
});

it('should be undefined for user email', () => {
    expect(User.email).toBe("");
});

it('should be undefined for user imageUrl', () => {
    expect(User.imageUrl).toBe("");
});

const sources = new NewsSources();
sources.add("abc-news", "The ABC of all kiddo news", "Want to learn how to read here you go", ["top"]);
sources.add("tech-crunch", "technology saga", ["top", "latest"]);

it('should return total number of nsources as 3', () => {
    expect(sources.total()).toEqual(2);
});

it('should return The ABC of all kiddo news as the first source name', () => {
    expect(sources.get()[0].header).toEqual("The ABC of all kiddo news");
});
//test for news news article
const articles = new NewsArticle();
articles.add("obasanjo join barcelona", "in his quest for medal obasanjo joins barcelona and team up with suarez", "sport", "goal.com", "image.jpg");
articles.add("Messi is pregnant", "The news came in after he's two goals against madrid, though the mother of the child is still missing", "sport", "goal.com", "image.jpg");
articles.add("Bayo displaces Mark", "the new andela faciltator out ran the facebook ceo in 200 meter race though news source is yet to be confirm", "tech", "unconfirm", "bayo.jpg");

it('should return total number of news as 3', () => {
    expect(articles.total()).toEqual(3);
});

it('should return obasanjo join barcelona as the first news title', () => {
    expect(articles.get()[0].header).toEqual("obasanjo join barcelona");
});

it('should return Messi is pregnant as the second news title', () => {
    expect(articles.get()[1].header).toEqual("Messi is pregnant");
});

it('should return total number of news that has `a` in its title as 3', () => {
    expect(articles.search('a').length).toBe(3);
});

it('should retun 1 for total number of search using obasanjo as search case', () => {
    expect(articles.search('obasanjo').length).toBe(1);
});
