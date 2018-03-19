import axios from 'axios';

import { ROOT_API_URL } from 'reference/urls';

export const network = axios.create({
  ROOT_API_URL,
});

network.interceptors.request.use(config => {
  const auth = sessionStorage.getItem('auth');
  config.headers.Authorization = `Token ${auth}`;
  return config;
});

network.interceptors.response.use(undefined, error => {
  /* const resp = error.response;
  if (resp.status === 401) setTimeout(() => errorAuthentification(error.response)); */
  return Promise.reject(error);
});
