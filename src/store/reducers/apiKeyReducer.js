import { createReducer } from 'redux-act';

import { localStorageBackUP } from 'services';
import { successUserRegistration, successUserAuthorization, errorGetUserData } from 'actions';

const { loadPlain: load, savePlain: save } = localStorageBackUP('apiKey');

const initialState = load() || '';

const apiKeyReducer = createReducer(
  {
    [successUserRegistration]: (state, apiKey) => save(apiKey),
    [successUserAuthorization]: (state, apiKey) => save(apiKey),
    [errorGetUserData]: (state, apiKey) => save(''),
  },
  initialState
);

export default apiKeyReducer;
