import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import 'normalize.css';

import { PATH } from 'shared/reference';
import { history } from 'shared/browserHistory';
import { themeSC } from 'shared/themeSC';
import { ProviderAuth } from 'module/private/workflow';
import { Private } from 'module/private';
import { Initialize } from 'module/private/Initialize';
import { AuthForm } from 'module/authForm';
import { Main } from 'module/main';

const Providers = ({ children }) => (
  <Router history={history}>
    <ThemeProvider theme={themeSC}>
      <ProviderAuth>{children}</ProviderAuth>
    </ThemeProvider>
  </Router>
);

const Root = () => (
  <Providers>
    <Initialize>
      <Router history={history}>{/* FIXME: Switch not update context without it =\ */}
        <Switch>
          <Route path={PATH.AUTH} component={AuthForm} />
          <Route>
            <Private to={['admin', 'user']} fallback={() => <Redirect to={PATH.AUTH} push />}>
              <Main />
            </Private>
          </Route>
        </Switch>
      </Router>
    </Initialize>
  </Providers>
);

ReactDOM.render(<Root />, document.getElementById('root'));