import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import 'normalize.css';

import { themeSC } from 'service';
import { AuthProvider } from 'workflow/auth';
import { Private } from 'workflow/auth/Private';
import { Initialize } from 'components/Initialize';
import { App } from 'components/App';
import { Auth } from 'components/Auth';

const Providers = ({ children }) => (
  <ThemeProvider theme={themeSC}>
    <BrowserRouter basename="/">
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);

const Root = () => (
  <Providers>
    <Initialize>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route>
          <Private to={['admin', 'user']} fallback={() => <Redirect to="/auth" />}>
            <App />
          </Private>
        </Route>
      </Switch>
    </Initialize>
  </Providers>
);

ReactDOM.render(<Root />, document.getElementById('root'));
