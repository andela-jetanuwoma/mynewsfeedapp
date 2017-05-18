import request from 'request';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import API from '../models/API';
import Sources from '../models/Sources';
import NewsArticles from '../models/News';
import User from '../models/User';
/** Perform api call and return api result appropiately*/
const appActions = {
  /**
  * Get news from the api
  * @param {string} source
  * @param {string} sortType
  * @return {void}
  */
  getNews: (source, sortType = null) => {
    if(source !== undefined){
    API.addQuery('source', source);
    if (sortType !== null) {
      API.addQuery('sortBy', sortType);
    }

    request(API.getLink(), (error, response, body) => {
      const newsfeeds = new NewsArticles();
      const bodyResult = JSON.parse(body);
      if (response.statusCode === 200) {
        const articles = bodyResult.articles;
        articles.forEach((article) => {
          newsfeeds.add(
          article.title,
          article.description,
          article.author,
          article.url,
          article.urlToImage,
        );
        });

        AppDispatcher.dispatch({
          eventName: AppConstants.GET_NEWS,
          news: newsfeeds.get(),
        });
      }
    });
    return true;
  } else {
    return false;
  }
  },
/**
* Get news sources from the API
* @return {void}
*/
  getSources: () => {
    const feedSources = new Sources();
    request(API.apilink, (error, response, body) => {
      if (response.statusCode === 200) {
        const result = JSON.parse(body);
        const sources = result.sources;
        sources.forEach((source) => {
          feedSources.add(
            source.id,
            source.name,
            source.description,
            source.sortBysAvailable.join(','));
        });
        AppDispatcher.dispatch({
          eventName: AppConstants.GET_SOURCES,
          sources: feedSources.get(),
        });
      }
    });
  },
/**
* Get users saved collection and respective favorite
* @param {string} name
*/
  getCollectionNews: (name) => {
    const newsfeeds = new NewsArticles();
    const usersFavorites = User.favourites();
    const collectionFavorites = usersFavorites.fetchAll()[name];

    collectionFavorites.forEach((fav) => {
      API.addQuery('source', fav.id);
      request(API.getLink(), (error, response, body) => {
        API.clearQuery();
        const bodyResult = JSON.parse(body);
        if (response.statusCode === 200) {
          const articles = bodyResult.articles;
          articles.forEach((article) => {
            newsfeeds.add(
            article.title,
            article.description,
            article.author,
            article.url,
            article.urlToImage,
          );
          });

          AppDispatcher.dispatch({
            eventName: AppConstants.GET_NEWS,
            news: newsfeeds.get(),
          });
        }
      });
    });
  },
};

export default appActions;
