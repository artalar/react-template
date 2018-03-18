import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import 'normalize.css';

import { themeSC } from 'service';
import { Provider as AuthProvider } from 'workflow/auth';
import { Private } from 'components/common';
import { App } from 'components/App';
import { Auth } from 'components/Auth';

ReactDOM.render(
  <ThemeProvider theme={themeSC}>
    <AuthProvider>
      <BrowserRouter basename="/">
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route>
            <Private to={['admin', 'user']} fallback={() => <Redirect to="/auth" />}>
              <App />
            </Private>
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
