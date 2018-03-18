import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import 'normalize.css';

import { themeSC } from 'service';
import { App } from 'components/App';
import { Auth } from 'components/Auth';
import { Private } from 'components/common';

ReactDOM.render(
  <ThemeProvider theme={themeSC}>
    <BrowserRouter basename="/">
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route>
          <Private permissions={['admin', 'user']} fallback={() => <Redirect to="/auth" />}>
            <div><App /></div>
          </Private>
        </Route>
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);
