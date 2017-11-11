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
  const logger = createLogger({
    collapsed: true,
  });

  const middleware = applyMiddleware(
    asyncActionsCallerMiddleware,
    routerMiddleware(history),
    process.env.NODE_ENV === 'development' ? logger : undefined
  );

  const store = createStore(
    reducers,
    {}, // preloadedState
    process.env.NODE_ENV === 'development' ? composeWithDevTools(middleware) : middleware
  );
  assignAll(actions, store);
  return { history, store };
};
