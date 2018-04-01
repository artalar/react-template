import axios from 'axios';

import { PATH } from 'shared/reference';
import { logOut } from 'module/private/workflow';

export const network = axios.create({
  baseURL: PATH.API,
});

network.interceptors.request.use(config => {
  const auth = sessionStorage.getItem('auth');
  config.headers.Authorization = `Token ${auth}`;
  return config;
});

network.interceptors.response.use(undefined, error => {
  const resp = error.response;
  if (resp.status === 401) setTimeout(logOut);
  return Promise.reject(error);
});
