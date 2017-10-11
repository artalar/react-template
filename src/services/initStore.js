import { combineReducers, createStore, applyMiddleware } from 'redux';
import { assignAll } from 'redux-act';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import logger from 'redux-logger'
import { save, load } from 'redux-localstorage-simple';
import { composeWithDevTools } from 'redux-devtools-extension';

import { asyncActionsCallerMiddleware } from 'services/redux-act-dispatch-free';

import actions from 'actions';

export default applicationReducers => {
  const reducers = combineReducers({ app: applicationReducers, router: routerReducer });
  const history = createHistory();
  const store = createStore(
    reducers,
    { ...load(), router: undefined }, // preloadedState
    composeWithDevTools(applyMiddleware(asyncActionsCallerMiddleware, logger, save(), routerMiddleware(history)))
  );
  assignAll(actions, store);
  return { history, store };
};
