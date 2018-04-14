// for hosting at the path
// like: `domain.com/some_path`
const URL_PREFIX = process.env.URL_PREFIX || '';

export const PATH = {
  API: `${URL_PREFIX}/api`,
  AUTH: `${URL_PREFIX}/auth`,
  HOME: `${URL_PREFIX}/`,
};

export const STATUS = {
  INITIAL: 'initial',
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
};

let ALL_PERMISSION;
export const PERMISSIONS = {
  ADMIN: 'admin',
  USER: 'user',
  getAll() {
    // exclude method
    return ALL_PERMISSION || (ALL_PERMISSION = Object.values(this).filter(value => typeof value === 'string'));
  },
};

export const CONTEXT = {
  PRIVATE: 'private',
  AUTH: 'auth',
};
