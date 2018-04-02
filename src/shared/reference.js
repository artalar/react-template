// for hosting at the path
// like: `domain.com/some_path`
const URL_PREFIX = process.env.URL_PREFIX || '';

export const PATH = {
  API: `${URL_PREFIX}/api`,
  AUTH: `${URL_PREFIX}/auth`,
  HOME: URL_PREFIX,
};

export const STATUS = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
};

export const PERMISSIONS = {
  ADMIN: 'admin',
  USER: 'user',
  getAll() {
    return Object.values(this);
  },
};

export const CONTEXT = {
  PRIVATE: 'PRIVATE',
};
