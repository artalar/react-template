import { createAsyncCycle } from 'redux-act-dispatch-free';

import { api } from 'sources';

//#region get user data
export const [fetchGetUserData, successGetUserData, errorGetUserData] = createAsyncCycle(
  'get user data',
  store => () => api.getUserData()
);
//#endregion
