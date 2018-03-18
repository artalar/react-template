import * as React from "react";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
`;

const Container = styled.main`
  display: flex;
`;

export class AuthRaw extends React.Component {
  render() {
    return (
        [<Header>react-template</Header>,
        <Container>Auth</Container>]
    );
  }
}

export const Auth = AuthRaw;
