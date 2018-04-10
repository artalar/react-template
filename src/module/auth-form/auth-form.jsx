import * as React from 'react';
import styled from 'styled-components';

import { CONTEXT } from 'shared/reference';
import { contextConnectors } from 'shared/context-master';

const Header = styled.header`
  display: flex;
`;

const ErrorMessage = styled.span`
  color: red;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 20rem;
`;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export class AuthFormRaw extends React.Component {
  values = {};

  handleChange = e => {
    this.values[e.target.name] = e.target.value;
    this.props.clearError();
  };

  handleSubmit = e => {
    e.preventDefault();
    try {
      this.props.authUser(this.values);
    } catch (e) {}
  };

  render() {
    const { error } = this.props;
    return [
      <Header>react-template</Header>,
      <Container>
        <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <input name="email" type="email" placeholder="email" />
          <input name="password" type="password" placeholder="password" />
          <button type="submit">Submit</button>
        </Form>
        {error !== null && <ErrorMessage>{error}</ErrorMessage>}
      </Container>,
    ];
  }
}

export const AuthForm = contextConnectors[CONTEXT.AUTH](
  ({ workflow: { authUser, clearError }, state: { error } }) => ({
    authUser,
    clearError,
    error,
  })
)(AuthFormRaw);
