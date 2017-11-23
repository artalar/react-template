import Button from './Button'

export default Button.extend`
  border: 2px dashed black;
  &:hover {
    border: 2px dashed transparent;
  }
`