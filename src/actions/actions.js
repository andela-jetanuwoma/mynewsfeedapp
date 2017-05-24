import axios from 'axios';
import Dispatcher from '../dispatcher/AppDispatcher';
import constants from '../constants/constants';
import Api from '../models/API';
import Sources from '../models/Sources';
import News from '../models/News';
import User from '../models/User';
/** Perform api call and return api result appropiately*/
const actions = {
  /**
  * Get news from the api and dispatches it to the News Stores
  * @param {string} source News Sources to fetch
  * @param {string} sortType Sort by value
  * @return {func} axios call
  */
  getNews: (source, sortType = null) => {
    if (sortType !== null) {
      Api.addQuery('sortBy', sortType);
    }
    return axios.get(Api.getLink())
      .then((response) => {
        const feeds = new News();
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
          Dispatcher.dispatch({
            eventName: constants.GET_NEWS,
            news: feeds.get(),
          });
        }
      }).catch((errors) => {
        Dispatcher.dispatch({
          eventName: constants.GET_ERROR,
          error: errors,
        });
      });
  },

/**
* Get news sources from the Api and dispatch it to the SourcesStore
* @return {func} return axios call
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
        Dispatcher.dispatch({
          eventName: constants.GET_SOURCES,
          sources: sourcesList.get(),
        });
      }
    }).catch((errors) => {
      Dispatcher.dispatch({
        eventName: constants.GET_ERROR,
        error: errors,
      });
    });
  },
/**
* Get users saved collection and respective favorite then dispatch it to the collection store
* @param {string} name collection name that holds the favourites
* @return {func} return axios call
*/
  getCollectionNews: (name) => {
    const feeds = new News();
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
          Dispatcher.dispatch({
            eventName: constants.GET_NEWS,
            news: feeds.get(),
          });
        }
      }).catch((errors) => {
        Dispatcher.dispatch({
          eventName: constants.GET_ERROR,
          error: errors,
        });
      });
    });
  },
};

export default actions;
