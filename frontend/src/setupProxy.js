const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8000', // Update with the URL of your Express.js server
      changeOrigin: true,
    })
  );
};
