import axios from 'axios';

import { errorAuthentification } from 'actions';
import { ROOT_API_URL } from 'constants/urls';

const network = axios.create({
  ROOT_API_URL,
});

network.interceptors.request.use(config => {
  const apiKey = localStorage.getItem('apiKey');
  config.headers.Authorization = `Token ${apiKey}`
  return config;
});

network.interceptors.response.use(undefined, error => {
  const resp = error.response;
  if (resp.status === 401) errorAuthentification(error.response);
  return error;
});

export default network;
