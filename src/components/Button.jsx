import styled from 'styled-components'

export default styled.button`
  box-shadow: 7px 7px 7px 0px rgba(0, 0, 0, 0.3);

  /* .\src\sources\themeSC.js */
  ${props => props.theme.transition};
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 11px 11px 7px 0px rgba(0, 0, 0, 0.3);
  }
`