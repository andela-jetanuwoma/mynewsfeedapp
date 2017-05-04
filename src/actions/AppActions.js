import request from 'request';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import API from '../models/API';
import SourcesContainer from '../models/sources';
import NewsContainer from '../models/news';
import User from '../models/user';

const AppActions = {
  getNews: (source, sortType = null) => {
    API.clearQuery();
    API.addQuery('source', source);
    if (sortType !== null) {
      API.addQuery('sortBy', sortType);
    }
    request(API.getLink(), (error, response, body) => {
      const newsfeeds = new NewsContainer();
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
  },

  getSources: () => {
    API.clearQuery();
    const feedSources = new SourcesContainer();
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
          newItem: feedSources.get(),
        });
      }
    });
  },

  getCollectionNews: (name) => {
    const newsfeeds = new NewsContainer();
    const usersFavorites = User.favourites();
    const collectionFavorites = usersFavorites.fetchAll()[name];
    collectionFavorites.forEach((fav) => {
      API.clearQuery();
      API.addQuery('source', fav.id);
      request(API.getLink(), (error, response, body) => {
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

export default AppActions;
