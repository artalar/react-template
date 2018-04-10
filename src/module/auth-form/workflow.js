import { Coach } from 'coach-stm';
import middleware, { withMeta } from 'coach-stm/es/middleware';

import { STATUS, CONTEXT, PATH } from 'shared/reference';
import { Store } from 'shared/store';
import { setStatusLoading, setStatusLoaded, onError } from 'shared/updaters';
import { history } from 'shared/browserHistory';
import { addContext } from 'shared/context-master';
import { isEmail, isPassword } from 'shared/validator';
import * as api from './api';
import { updatePermissions } from 'module/private/workflow';

const initialState = {
  status: STATUS.INITIAL,
  error: null,
};

const store = new Store(initialState);

const coach = new Coach({
  middleware: {
    store: withMeta({ store }),
    api: withMeta({ api }),
    ...middleware,
  },
});

const successRedirect = () => history.push(PATH.HOME);

const fetchAuthUser = async (p, { api }) => await api.authUser(p);

const setClearError = (p, { store }) => void store.merge({ error: null });

// Goals

export const clearError = coach.goal({ setClearError });

export const formValid = coach.goal({
  isEmail: ({ email }) => void isEmail(email),
  isPassword: ({ password }) => void isPassword(password),
});

export const authUser = coach.goal(
  'authenticate user',
  {
    formValid,
    setStatusLoading,
    fetchAuthUser,
    updatePermissions,
    setStatusLoaded,
    successRedirect,
  },
  onError
);

addContext({ name: CONTEXT.AUTH, store, workflow: { authUser, clearError } });
