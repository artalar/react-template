import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';

import { fetchGetUserData } from 'actions';

import Authorization from 'containers/Authorization';
import Registration from 'containers/Registration';
import Sidebar from 'containers/Sidebar';
import Main from 'containers/Main';

class App extends React.Component {
  static propTypes = { apiKey: PropTypes.string.isRequired };

  componentDidMount = () => {
    if (this.props.apiKey) fetchGetUserData();
  };

  render() {
    const { apiKey } = this.props;

    if (apiKey) {
      return (
        <div>
          <Sidebar />
          <Main />
        </div>
      );
    } else {
      return (
        <div>
          <Switch>
            <Route path="/authorization" component={Authorization} />
            <Route path="/registration" component={Registration} />
            <Redirect to="/authorization" />
          </Switch>
        </div>
      );
    }
  }
}

App.propTypes = { apiKey: PropTypes.string, userLoaded: PropTypes.bool };

const mapStateToprops = state => ({
  apiKey: state.app.apiKey,
});

export default connect(mapStateToprops)(App);
