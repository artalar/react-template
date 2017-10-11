import { createReducer } from 'redux-act';
import {
  responseUserRegistration,
  errorResponceUserRegistration,
  responseUserAuthorization,
  errorResponceUserAuthorization,
  responseUserData,
  errorResponceUserData,
} from 'actions/userIndeteficationActions';

const initialState = {
  apiKey: localStorage.getItem('apiKey'),
  loaded: false,
  error: undefined,
};

const userIndeteficationReducer = createReducer(
  {
    [responseUserRegistration]: (state, apiKey) => {
      localStorage.setItem('apiKey', apiKey);
      return { ...state, error: undefined, apiKey, loaded: true };
    },
    [errorResponceUserRegistration]: (state, error) => {
      return {
        ...state,
        error,
        apiKey: null,
        loaded: true,
      };
    },
    [responseUserAuthorization]: (state, { apiKey }) => {
      localStorage.setItem('apiKey', apiKey);
      return {
        ...state,
        error: undefined,
        loaded: true,
        apiKey,
      };
    },
    [errorResponceUserAuthorization]: (state, error) => {
      return {
        ...state,
        error,
        apiKey: null,
        loaded: true,
      };
    },
    [responseUserData]: (state, { email }) => ({
      ...state,
      error: undefined,
      loaded: true,
      email,
    }),
    [errorResponceUserData]: (state, error) => {
      localStorage.removeItem('apiKey');
      return {
        ...state,
        error,
        apiKey: null,
        loaded: true,
      };
    },
  },
  initialState
);

export default userIndeteficationReducer;
