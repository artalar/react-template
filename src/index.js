import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import initStore from 'services/initStore';
import networkConfigurationsService from 'services/networkConfigurationsService';
import reducers from 'reducers';

import App from './App';

networkConfigurationsService.init();
const { store, history } = initStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
