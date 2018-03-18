import * as React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'workflow/auth';

export class PrivateRaw extends React.Component {
  static propTypes = {
    to: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.oneOf(['some', 'every']),
    permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
    fallback: PropTypes.func,
  };

  static defaultProps = {
    type: 'some',
  };

  render() {
    const { to, type, permissions, children, fallback } = this.props;

    if (to[type](permission => permissions.includes(permission))) {
      return children;
    } else if (fallback) {
      return React.createElement(fallback);
    } else {
      return null;
    }
  }
}

export const Private = connect(({ permissions }) => ({ permissions }))(PrivateRaw);
