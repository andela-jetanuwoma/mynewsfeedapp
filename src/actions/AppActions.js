import axios from 'axios';
import appDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import Api from '../models/API';
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
    if (sortType !== null) {
      Api.addQuery('sortBy', sortType);
    }
    return axios.get(Api.getLink())
      .then((response) => {
        const feeds = new NewsArticles();
        const body = response.data;
        if (response.status === 200) {
          const articles = body.articles;
          articles.forEach((article) => {
            feeds.add(
            article.title,
            article.description,
            article.author,
            article.url,
            article.urlToImage,
          );
          });
          appDispatcher.dispatch({
            eventName: AppConstants.GET_NEWS,
            news: feeds.get(),
          });
        }
      }).catch((errors) => {
        appDispatcher.dispatch({
          eventName: AppConstants.GET_ERROR,
          error: errors,
        });
      });
  },

/**
* Get news sources from the API
* @return {void}
*/
  getSources: () => {
    return axios.get(Api.getLink())
    .then((response) => {
      const sources = new Sources();
      const body = response.data;
      if (response.status === 200) {
        const result = JSON.parse(body);
        const sourcesList = result.sources;
        sources.forEach((source) => {
          sourcesList.add(
            source.id,
            source.name,
            source.description,
            source.sortBysAvailable.join(','));
        });
        appDispatcher.dispatch({
          eventName: AppConstants.GET_SOURCES,
          sources: sourcesList.get(),
        });
      }
    }).catch((errors) => {
      appDispatcher.dispatch({
        eventName: AppConstants.GET_ERROR,
        error: errors,
      });
    });
  },
/**
* Get users saved collection and respective favorite
* @param {string} name
*/
  getCollectionNews: (name) => {
    const feeds = new NewsArticles();
    const usersFavorites = User.favourites();
    const collectionFavorites = usersFavorites.fetchAll()[name];

    collectionFavorites.forEach((fav) => {
      Api.addQuery('source', fav.id);
      return axios.get(Api.getLink())
      .then((response) => {
        const body = response.data;
        if (response.status === 200) {
          const articles = body.articles;
          articles.forEach((article) => {
            feeds.add(
            article.title,
            article.description,
            article.author,
            article.url,
            article.urlToImage,
          );
          });
          appDispatcher.dispatch({
            eventName: AppConstants.GET_NEWS,
            news: feeds.get(),
          });
        }
      }).catch((errors) => {
        appDispatcher.dispatch({
          eventName: AppConstants.GET_ERROR,
          error: errors,
        });
      });
    });
  },
};

export default appActions;
