import * as React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'workflow/auth';
import { STATUS } from 'reference';

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
    if (status === STATUS.INITIAL || status === STATUS.LOADING) return <span>Loading...</span>;
    return this.props.children;
  }
}
export const Initialize = connect(({ work: { getMe }, state: { status } }) => ({ getMe, status }))(
  InitializeRaw
);
