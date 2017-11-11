import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { ThemeProvider } from 'styled-components';

import initStore from 'services/initStore';
import { themeSC } from 'sources';
import reducers from 'reducers';

import App from './App';

const { store, history } = initStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <ConnectedRouter history={history}>
        <ThemeProvider theme={themeSC}>
          <Route component={App} />
        </ThemeProvider>
      </ConnectedRouter>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
