import { createReducer } from 'redux-act';

import { sessionStorageBackUP } from 'services';
import {
  successUserRegistration,
  successUserAuthorization,
  errorGetUserData,
  errorAuthentification,
} from 'actions';

const { loadPlain: load, savePlain: save } = sessionStorageBackUP('auth');

const initialState = load() || '';

const sessionReducer = createReducer(
  {
    [successUserRegistration]: (state, data) => save(data.token),
    [successUserAuthorization]: (state, data) => save(data.token),
    [errorGetUserData]: state => save(''),
    [errorAuthentification]: state => save(''),
  },
  initialState
);

export default sessionReducer;
