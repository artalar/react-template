import axios from 'axios';

import { network } from 'shared/network';

export const authUser = ({ email, password }) => axios.post('/auth', { email, password });

export const getMe = () => network('/admin/me');
