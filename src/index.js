import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import 'normalize.css';

import { PATH, PERMISSIONS } from 'shared/reference';
import { history } from 'shared/browserHistory';
import { themeSC } from 'shared/themeSC';
import { ContextMaster } from 'shared/context-master';
import { Initialize, Private } from 'module/private';
import { AuthForm } from 'module/auth-form';
import { Main } from 'module/main';

const Providers = ({ children }) => (
  <Router history={history}>
    <ThemeProvider theme={themeSC}>
      <ContextMaster>{children}</ContextMaster>
    </ThemeProvider>
  </Router>
);

const Root = () => (
  <Providers>
    <Initialize>
      <Router history={history}>
        {/* FIXME: Switch not update context without it =\ */}
        <Switch>
          <Route path={PATH.AUTH} component={AuthForm} />
          <Route>
            <Private to={PERMISSIONS.getAll()} fallback={() => <Redirect to={PATH.AUTH} push />}>
              <Main />
            </Private>
          </Route>
        </Switch>
      </Router>
    </Initialize>
  </Providers>
);

ReactDOM.render(<Root />, document.getElementById('root'));
