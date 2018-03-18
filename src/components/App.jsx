import * as React from "react";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
`;

const Container = styled.main`
  display: flex;
`;

export class AppRaw extends React.Component {
  render() {
    return (
        [<Header>react-template</Header>,
        <Container>App</Container>]
    );
  }
}

export const App = AppRaw;
