import { createReducer } from 'redux-act';
import {
  fetchUserRegistration,
  successUserRegistration,
  errorUserRegistration,
  fetchUserAuthorization,
  successUserAuthorization,
  errorUserAuthorization,
  fetchGetUserData,
  successGetUserData,
  errorGetUserData,
} from 'actions';

const initialState = {
  loading: false,
  error: null,
};

const fetchData = state => ({
  ...state,
  loading: true,
  error: null,
});

const successData = (state, data) => ({
  ...state,
  loading: false,
  error: null,
  ...data,
});

const errorData = (state, error) => ({
  ...state,
  loading: false,
  error,
});

const userReducer = createReducer(
  {
    [fetchUserRegistration]: fetchData,
    [successUserRegistration]: successData,
    [errorUserRegistration]: errorData,
    [fetchUserAuthorization]: fetchData,
    [successUserAuthorization]: successData,
    [errorUserAuthorization]: errorData,
    [fetchGetUserData]: fetchData,
    [successGetUserData]: successData,
    [errorGetUserData]: errorData,
  },
  initialState
);

export default userReducer;
