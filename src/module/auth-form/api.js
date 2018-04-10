import axios from 'axios';

export const authUser = ({ email, password }) => axios.post('/api/auth', { email, password });
