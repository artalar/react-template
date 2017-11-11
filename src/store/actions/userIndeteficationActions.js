import { push } from 'react-router-redux';
import { createAsyncAction, createAsyncCycle } from 'redux-act-dispatch-free';

import { api } from 'sources';

export const errorAuthentification = createAsyncAction(
  'Server not accept auth',
  store => async () => store.dispatch(push('/auth'))
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

//#region get user data
export const [fetchGetUserData, successGetUserData, errorGetUserData] = createAsyncCycle(
  'get user data',
  store => () => api.getUserData()
);
//#endregion
