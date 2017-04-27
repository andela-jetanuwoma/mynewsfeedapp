import request from 'request';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import API from '../models/API';
import SourcesContainer from '../models/sources';

const AppActions = {

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
};

export default AppActions;
