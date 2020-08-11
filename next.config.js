const withSvgr = require('next-svgr');
const withPWA = require('next-pwa');

module.exports = withSvgr(
  withPWA({
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development',
    },
    webpackDevMiddleware: config => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };

      return config;
    },
  }),
);
