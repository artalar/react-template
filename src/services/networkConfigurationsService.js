import axios from 'axios';

import { ROOT_API_URL } from 'constants/urls';

export default {
  init() {
    axios.defaults.baseURL = ROOT_API_URL;
    axios.defaults.headers.common['Authentefication'] = localStorage.getItem('apiKey');
  },
};
