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
  static propTypes = { auth: PropTypes.string.isRequired };

  componentDidMount = () => {
    if (this.props.auth) fetchGetUserData();
  };

  render() {
    const { auth } = this.props;

    if (auth) {
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

App.propTypes = { auth: PropTypes.string, userLoaded: PropTypes.bool };

const mapStateToprops = state => ({
  auth: state.app.auth,
});

export default connect(mapStateToprops)(App);
