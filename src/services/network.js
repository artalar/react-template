import axios from 'axios';

import { errorAuthentification } from 'actions';
import { ROOT_API_URL } from 'constants/urls';

const network = axios.create({
  ROOT_API_URL,
});

network.interceptors.request.use(config => {
  const session = sessionStorage.getItem('session');
  config.headers.Authorization = `Token ${session}`;
  return config;
});

network.interceptors.response.use(undefined, error => {
  const resp = error.response;
  if (resp.status === 401) setTimeout(() => errorAuthentification(error.response));
  return Promise.reject(error);
});

export default network;
