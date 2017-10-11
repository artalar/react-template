import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Sidebar extends React.Component {
  static propTypes = { className: PropTypes.string.isRequired };

  render() {
    const { className } = this.props;
    return <aside className={className}>Sidebar</aside>;
  }
}

export default styled(Sidebar)``;
