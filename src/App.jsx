import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';

import actions from 'actions';

import Authorization from 'containers/Authorization';
import Registration from 'containers/Registration';
import Sidebar from 'containers/Sidebar';
import Main from 'containers/Main';

class App extends React.Component {
  componentDidMount = () => {
    if (this.props.apiKey !== null) {
      actions.fetchUserData();
    }
  };

  render() {
    const { apiKey, userLoaded } = this.props;

    if (this.props.apiKey !== null && userLoaded === false) return <div />;

    if (apiKey) {
      return (
        <div id="wrapper">
          <Sidebar />
          <Main />
        </div>
      );
    } else {
      return (
        <div id="wrapper">
          <Switch>
            <Route exact path="/authorization" component={Authorization} />
            <Route exact path="/registration" component={Registration} />
            <Redirect to="/authorization" />
          </Switch>
        </div>
      );
    }
  }
}

App.propTypes = { apiKey: PropTypes.string, userLoaded: PropTypes.bool };

const mapStateToprops = state => ({
  apiKey: state.app.user.apiKey,
  userLoaded: state.app.user.loaded,
  // FIXME: for rerender, when location change
  url: state.router.location.pathname,
});

export default connect(mapStateToprops)(App);
