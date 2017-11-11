import { combineReducers } from 'redux';

import apiKeyReducer from './apiKeyReducer';
import userIndeteficationReducer from './userIndeteficationReducer';

export default combineReducers({
  apiKey: apiKeyReducer,
  user: userIndeteficationReducer,
});
