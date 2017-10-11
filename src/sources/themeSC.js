export default {
  colors: {
    primary: 'black',
  },
  transitionFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transition: 'transition all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  getTransition: (target = 'all', duration = '.3s') =>
    `transition ${target} ${duration} cubic-bezier(0.4, 0, 0.2, 1)`,
  shadow: 'box-shadow: 0 0 1vh rgba(0, 0, 0, 0.2);',
};
