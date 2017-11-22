import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { RoundedButton } from 'components';
import { fetchUserAuthorization } from 'actions';

const AuthButton = RoundedButton.extend`
  margin: 10px;
  background-color: ${({ theme }) => theme.colors.secondary.replace('1)', '0.7)'/*add transparent*/)};
`;

class Authorization extends React.Component {
  static propTypes = { className: PropTypes.string.isRequired };

  state = {
    email: '',
    password: '',
  };

  handleChangeInput = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmiteForm = e => {
    e.preventDefault();
    const { email, password } = this.state;
    fetchUserAuthorization(email, password);
  };

  render() {
    const { className } = this.props;
    const { email, password } = this.state;
    return (
      <div className={className}>
        <form onChange={this.handleChangeInput} onSubmit={this.handleSubmiteForm}>
          <input label="email*" name="email" type="email" value={email} />
          <input label="password*" name="password" type="password" value={password} />
          <AuthButton className="authorization-btn btn" type="submit" name="submit">
            authorize
          </AuthButton>
          <Link to="/registration" className="registration-link">
            <span>registration</span>
          </Link>
        </form>
      </div>
    );
  }
}

export default styled(Authorization)``;
