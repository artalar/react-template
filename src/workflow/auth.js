import { Coach, indent } from 'coach-stm';
import middleware, { ifError, Store, withMeta } from 'coach-stm/middleware';

import { STATUS } from 'reference';
import { contextFactory } from 'service/contextFactory';
import { isEmail, isPassword } from 'service/validator';
import * as api from 'service/api';

const store = new Store({
  permissions: [],
  status: STATUS.INITIAL,
  errorMsg: null,
});

const setStatusLoading = indent((p, { store }) => store.merge({ status: STATUS.LOADING }));

const setStatusLoaded = indent((p, { store }) => store.merge({ status: STATUS.LOADED }));

const selectPermissions = ({ data: { permissions } }) => ({ permissions });

const setPermissions = indent((p, { store }) => store.merge(p));

const fetchGetMe = async (p, { api }) => await api.getMe(p);

const fetchAuthUser = async (p, { api }) => await api.authUser(p);

const setError = error => store.merge({ status: STATUS.ERROR, errorMsg: error.message });

const coach = new Coach({
  middleware: {
    store: withMeta({ store }),
    api: withMeta({ api }),
    error: ifError(setError),
    ...middleware,
  },
});

// Logic

export const getMe = coach.goal('fetch user info', {
  setStatusLoading,
  fetchGetMe,
  selectPermissions,
  setPermissions,
  setStatusLoaded,
});

export const formValid = coach.goal({ isEmail, isPassword });

export const authUser = coach.goal('authentificate user', {
  formValid,
  setStatusLoading,
  fetchAuthUser,
  selectPermissions,
  setPermissions,
  setStatusLoaded,
});

export const { connect, Provider } = contextFactory('auth', store, {
  getMe,
  authUser,
});
