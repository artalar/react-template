export const themeSC = { // FIXME: rewrite me
  colors: {
    primary: 'rgba(33, 150, 243, 1)',
    secondary: 'rgba(0, 188, 212, 1)'
  },
  transitionFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transition: 'transition all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  getTransition: (target = 'all', duration = '.3s') =>
    `transition ${target} ${duration} cubic-bezier(0.4, 0, 0.2, 1)`,
};
