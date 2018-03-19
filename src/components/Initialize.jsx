import * as React from 'react';

import { connect } from 'workflow/auth';

export class InitializeRaw extends React.Component {
  componentDidMount() {
    this.props.getMe();
  }
  render() {
    return this.props.children;
  }
}
export const Initialize = connect(({ getMe }) => ({ getMe }))(InitializeRaw);
