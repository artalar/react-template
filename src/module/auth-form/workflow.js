import { Coach } from 'coach-stm';
import middleware, { withMeta } from 'coach-stm/es/middleware';

import { updatePermissions } from 'module/private/workflow';
import { PATH, STATUS } from 'shared/reference';
import { contextFactory } from 'shared/contextFactory';
import { history } from 'shared/browserHistory';
import { Store } from 'shared/store';
import { setStatusLoading, setStatusLoaded, onError } from 'shared/updaters';
import { isEmail, isPassword } from 'shared/validator';
import * as api from 'shared/api';

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

export const formValid = coach.goal({ isEmail, isPassword });

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

// TODO: registration

export const { connect: connectAuthForm, Provider: ProviderAuthForm } = contextFactory(store, {
  authUser,
});
