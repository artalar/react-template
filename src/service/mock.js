export const getMe = () =>
  new Promise(r => setTimeout(r, 500, { data: { permissions: ['admin'] } }));
