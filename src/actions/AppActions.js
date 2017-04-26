import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import API from '../models/API';
import request from 'request';
import SourcesContainer from '../models/sources';
let AppActions = {

	getSources:()=>{
       API.clearQuery();
       let feedSources = new SourcesContainer();
       request(API.apilink,(error,response,body)=>{
       	   if(response.statusCode === 200){
       	      body = JSON.parse(body);
            
       	   let sources = body.sources;

       	   sources.forEach(source=>{
                feedSources.add(source.id,source.name,source.description,source.sortBysAvailable.join(','));
       	   });
            
             
              AppDispatcher.dispatch({

        eventName: AppConstants.GET_SOURCES,
        newItem: feedSources.get() // example data

       });
            

       	   }
       });

     
	}
};

export default AppActions;