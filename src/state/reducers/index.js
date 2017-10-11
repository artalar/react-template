import { combineReducers } from 'redux';

import userIndeteficationReducer from './userIndeteficationReducer';

export default combineReducers({
  user: userIndeteficationReducer,
});
