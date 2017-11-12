import { push } from 'react-router-redux';
import { createAsyncAction, createAsyncCycle } from 'redux-act-dispatch-free';

import { api } from 'sources';

export const errorAuthentification = createAsyncAction(
  'Server not accept auth',
  store => () => store.dispatch(push('/registration'))
);

//#region register user
export const [
  fetchUserRegistration,
  successUserRegistration,
  errorUserRegistration,
] = createAsyncCycle('register user', store => (email, password) =>
  api.registerUser(email, password)
);
//#endregion

//#region authorize user
export const [
  fetchUserAuthorization,
  successUserAuthorization,
  errorUserAuthorization,
] = createAsyncCycle('authorize user', store => (email, password) =>
  api.authorizeUser(email, password)
);
//#endregion