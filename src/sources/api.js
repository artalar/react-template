import axios from 'axios';

import { network } from 'services';
import { ROOT_API_URL } from 'constants/urls';

export default {
  registerUser(email, password) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return axios({
      method: 'POST',
      url: `${ROOT_API_URL}/registration`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: formData,
    });
  },
  authorizeUser(email, password) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return axios({
      method: 'POST',
      url: `${ROOT_API_URL}/authentification`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: formData,
    });
  },
  getUserData: () => network(`${ROOT_API_URL}/me`),
};
