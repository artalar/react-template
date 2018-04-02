import * as React from 'react';
import PropTypes from 'prop-types';

import { CONTEXT } from 'shared/reference';
import { contextConnectors } from 'shared/ContextMaster';
// trigger adding provider
import './workflow';

export class PrivateRaw extends React.Component {
  static propTypes = {
    to: PropTypes.arrayOf(PropTypes.string).isRequired,
    any: PropTypes.bool,
    permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
    fallback: PropTypes.func,
  };

  static defaultProps = {
    any: true,
  };

  render() {
    const { to, any, permissions, children, fallback } = this.props;

    if (to[any ? 'some' : 'every'](permission => permissions.includes(permission))) {
      return children;
    } else if (fallback) {
      return React.createElement(fallback);
    } else {
      return null;
    }
  }
}

export const Private = contextConnectors[CONTEXT.PRIVATE](
  ({ state: { permissions = [] } = {} }) => ({ permissions })
)(PrivateRaw);
