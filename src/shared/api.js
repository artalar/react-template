import { network } from 'shared/network';

export const getMe = () => network('/admin/me');
