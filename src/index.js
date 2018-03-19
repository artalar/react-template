import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import 'normalize.css';

import { themeSC, Private } from 'service';
import { Provider as AuthProvider } from 'workflow/auth';
import { Initialize } from 'components/Initialize';
import { App } from 'components/App';
import { Auth } from 'components/Auth';

class Root extends React.Component {
  render() {
    return (
      <ThemeProvider theme={themeSC}>
        <AuthProvider>
          <Initialize>
            <BrowserRouter basename="/">
              <Switch>
                <Route path="/auth" component={Auth} />
                <Route>
                  <Private
                    to={['admin', 'user']}
                    any={true}
                    fallback={() => <Redirect to="/auth" />}
                  >
                    <App />
                  </Private>
                </Route>
              </Switch>
            </BrowserRouter>
          </Initialize>
        </AuthProvider>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
