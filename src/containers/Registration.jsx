import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { DashedButton } from 'components';
import { fetchUserRegistration } from 'actions';

const RegButton = DashedButton.extend`
  margin: 10px;
  background-color: ${({theme}) => theme.colors.primary.replace('1)', '0.7)'/*add transparent*/)};
`;

class Registration extends React.Component {
  static propTypes = { className: PropTypes.string.isRequired };

  state = {
    email: '',
    password: '',
    passwordRepeat: '',
  };

  handleChangeInput = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmiteForm = e => {
    e.preventDefault();
    const { email, password, passwordRepeat } = this.state;
    if (password === passwordRepeat) {
      fetchUserRegistration(email, password);
    }
  };

  render() {
    const { className } = this.props;
    const { email, password, passwordRepeat } = this.state;
    return (
      <div className={className}>
        <form onChange={this.handleChangeInput} onSubmit={this.handleSubmiteForm}>
          <input label="email*" name="email" type="email" value={email} />
          <input label="password*" name="password" type="password" value={password} />
          <input
            label="repeat password*"
            name="passwordRepeat"
            type="password"
            value={passwordRepeat}
          />
          <RegButton type="submit" name="submit">
            register
          </RegButton>
          <Link to="/authorization">
            <span>authorization</span>
          </Link>
        </form>
      </div>
    );
  }
}

export default styled(Registration)``;
