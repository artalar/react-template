import * as React from 'react';
import PropTypes from 'prop-types';

import { STATUS } from 'reference';
import { connect } from 'workflow/auth';

export class PrivateRaw extends React.Component {
  static propTypes = {
    to: PropTypes.arrayOf(PropTypes.string).isRequired,
    any: PropTypes.bool,
    permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
    status: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    fallback: PropTypes.func,
  };

  static defaultProps = {
    any: false,
  };

  render() {
    const { to, any, permissions, status, children, fallback } = this.props;

    if (status === STATUS.INITIAL || status === STATUS.LOADING) {
      return null;
    } else if (to[any ? 'some' : 'every'](permission => permissions.includes(permission))) {
      return children;
    } else if (fallback) {
      return React.createElement(fallback);
    } else {
      return null;
    }
  }
}

export const Private = connect(({ state: { permissions, status } }) => ({ permissions, status }))(
  PrivateRaw
);
