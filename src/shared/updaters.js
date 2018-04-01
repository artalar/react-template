import { STATUS } from 'shared/reference';

export const setStatusLoading = (p, { store }) => void store.merge({ status: STATUS.LOADING });

export const setStatusLoaded = (p, { store }) => void store.merge({ status: STATUS.LOADED });

export const onError = (error, { store }) => {
  store.merge({ status: STATUS.ERROR, errorMsg: error.message });
  throw error;
};
