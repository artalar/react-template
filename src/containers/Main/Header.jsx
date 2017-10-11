import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Header extends React.Component {
  static propTypes = { className: PropTypes.string.isRequired };

  render() {
    const { className } = this.props;

    return <header className={className}>Header</header>;
  }
}

Header.propTypes = {};

export default styled(Header)``;
