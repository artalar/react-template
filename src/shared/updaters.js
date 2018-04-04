import { STATUS } from 'shared/reference';

export const setStatusLoading = (p, { store }) =>
  void store.merge({ status: STATUS.LOADING, error: null });

export const setStatusLoaded = (p, { store }) =>
  void store.merge({ status: STATUS.LOADED, error: null });

export const onError = (error, { store }) => {
  store.merge({ status: STATUS.ERROR, error: error.message });
  throw error;
};
