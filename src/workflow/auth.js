import { Coach } from '../coach-stm';
import middleware, { ifError } from '../coach-stm/middleware';

import { STATUS } from 'reference';
import { contextFactory } from 'service/contextFactory';
import { isEmail, isPassword } from 'service/validator';
import { getMe as fetchGetMe, authUser as fetchAuthUser } from 'service/api';

const coach = new Coach({
  middleware: middleware,
  state: {
    permissions: [],
    status: STATUS.INITIAL,
    errorMsg: null,
  },
});

// Prepare

const setStatusLoading = coach.offerState({ status: STATUS.LOADING });

const setStatusLoaded = coach.offerState({ status: STATUS.LOADED });

const selectPermissions = ({ data: { permissions } }) => ({ permissions });

const setPermissions = coach.setState;

const setError = error => coach.setState({ status: STATUS.ERROR, errorMsg: error.message });

// Env

coach.middleware.unshift(ifError(setError));

// Logic

const getMe = coach.goal('fetch user info', {
  setStatusLoading,
  fetchGetMe,
  selectPermissions,
  setPermissions,
  setStatusLoaded,
});

const formValid = coach.goal({ isEmail, isPassword });

const authUser = coach.goal('authentificate user', {
  formValid,
  setStatusLoading,
  fetchAuthUser,
  selectPermissions,
  setPermissions,
  setStatusLoaded,
});

export const { connect, Provider } = contextFactory('auth', coach, {
  getMe,
  authUser,
});
