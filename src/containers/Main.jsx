import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import fun_image from 'assets/img/fun_image.png';
import Header from './Main/Header';

class Main extends React.Component {
  static propTypes = { className: PropTypes.string.isRequired };

  render() {
    const { className } = this.props;

    return (
      <main className={className}>
        <Header />
        <img src={fun_image} alt="fun_image"/>
      </main>
    );
  }
}

export default styled(Main)``;
