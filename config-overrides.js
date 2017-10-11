module.exports = (config, env) => {
  const path = require('path');
  const context = path.join(__dirname);
  const src = path.join(context, 'src');

  if (env === 'development') {
    const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin');
    config.plugins.push(new BitBarWebpackProgressPlugin());
  }

  config.resolve.alias = {
    actions: path.resolve(src, 'state', 'actions'),
    assets: path.resolve(src, 'assets'),
    components: path.resolve(src, 'components'),
    constants: path.resolve(src, 'constants'),
    containers: path.resolve(src, 'containers'),
    reducers: path.resolve(src, 'state', 'reducers'),
    services: path.resolve(src, 'services'),
    sources: path.resolve(src, 'sources'),
    styles: path.resolve(src, 'assets', 'styles'),
    utils: path.resolve(src, 'utils'),
  };
  return config;
};
