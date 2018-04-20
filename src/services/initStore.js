import { combineReducers, createStore, applyMiddleware } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { assignAll } from 'redux-act';
import { createLogger } from 'redux-logger';
import { asyncActionsCallerMiddleware } from 'redux-act-dispatch-free';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as actions from 'actions';
import applicationReducers from 'reducers';

export default () => {
  const reducers = combineReducers({ app: applicationReducers, router: routerReducer });
  const history = createBrowserHistory();

  const middlewares = [asyncActionsCallerMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development') {
      middlewares.push(createLogger({ collapsed: true }));
  }

  let middleware = applyMiddleware(...middlewares);

  if (process.env.NODE_ENV === 'development') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(
    reducers,
    {}, // preloadedState
    middleware,
  );
  assignAll(actions, store);
  return { history, store };
};
