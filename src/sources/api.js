import axios from 'axios';

export default {
  registerUser(email, password) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return axios({
      method: 'POST',
      url: '/registration',
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
      url: '/authentification',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: formData,
    });
  },
  getUserData() {
    return axios({
      method: 'GET',
      url: '/me',
    });
  },
};
