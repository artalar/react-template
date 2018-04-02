import * as React from 'react';
import PropTypes from 'prop-types';

import { STATUS, CONTEXT } from 'shared/reference';
import { contextConnectors } from 'shared/ContextMaster';

export class InitializeRaw extends React.PureComponent {
  static = {
    getMe: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.getMe();
  }
  render() {
    const { status } = this.props;
    // TODO: add loading animation
    if (status === STATUS.INITIAL || status === STATUS.LOADING) return <span>Loading...</span>;
    return this.props.children;
  }
}
export const Initialize = contextConnectors[CONTEXT.PRIVATE](
  ({ workflow: { getMe }, state: { status } }) => ({ getMe, status })
)(InitializeRaw);
