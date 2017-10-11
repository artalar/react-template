import { createAction } from 'redux-act';
import { createAsyncAction } from 'services/redux-act-dispatch-free';

import api from 'sources/api';

export const responseUserRegistration = createAction('response user registration');
export const errorResponceUserRegistration = createAction('error response user registration');

export const fetchUserRegistration = createAsyncAction(
  'request user registration',
  store => async (email, password) => {
    try {
      const response = await api.registerUser(email, password);

      if (response.data.apiKey === '') throw new Error('Not authorized');

      responseUserRegistration(response.data.apiKey);
    } catch (e) {
      console.error(e);
      errorResponceUserRegistration(e.message || e);
    }
  }
);

///

export const responseUserAuthorization = createAction('response user authorization');
export const errorResponceUserAuthorization = createAction('error response user authorization');

export const fetchUserAuthorization = createAsyncAction(
  'request user authorization',
  store => async (email, password) => {
    try {
      const response = await api.authorizeUser(email, password);

      const { apiKey } = response.data;
      if (apiKey === undefined || apiKey === '') throw new Error('Not authorized');

      responseUserAuthorization({ apiKey });
    } catch (e) {
      console.error(e);
      errorResponceUserAuthorization(e.message || e);
    }
  }
);

///

export const responseUserData = createAction('response user data');
export const errorResponceUserData = createAction('error response user data');

export const fetchUserData = createAsyncAction(
  'request user data',
  store => async () => {
    try {
      const response = await api.getUserData();

      const { email } = response.data;
      if (email === undefined || email === '') throw new Error('Not authorized');

      responseUserData({ email });
    } catch (e) {
      console.error(e);
      errorResponceUserData(e.message || e);
    }
  }
);
