import axios from 'axios';

import { ROOT_API_URL } from 'reference/urls';
import { network } from 'service';
import { getMe as mockGetMe } from './mock';

export const authUser = ({ email, password }) =>
  axios.post({
    url: `${ROOT_API_URL}/auth`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: { email, password },
  });

export const getMe = () => mockGetMe() // network(`${ROOT_API_URL}/me`);
