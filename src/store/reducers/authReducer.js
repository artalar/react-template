import { createReducer } from 'redux-act';

import { sessionStorageBackUP } from 'services';
import {
  successUserRegistration,
  successUserAuthorization,
  errorGetUserData,
  errorAuthentification,
} from 'actions';

const { loadPlain: load, savePlain: save } = sessionStorageBackUP('session');

const initialState = load() || '';

const sessionReducer = createReducer(
  {
    [successUserRegistration]: (state, session) => save(session),
    [successUserAuthorization]: (state, session) => save(session),
    [errorGetUserData]: (state, session) => save(''),
    [errorAuthentification]: (state, session) => save(''),
  },
  initialState
);

export default sessionReducer;
