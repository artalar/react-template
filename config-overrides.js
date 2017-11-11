const { injectBabelPlugin } = require('react-app-rewired');

module.exports = (config, env) => {
  const path = require('path');

  if (env === 'development') {
    const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin');
    config.plugins.push(new BitBarWebpackProgressPlugin());
  }

  config = injectBabelPlugin(['babel-plugin-styled-components', { displayName: true }], config);

  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'src', 'store'),
  ];

  return config;
};
