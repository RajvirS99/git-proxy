const proxyApp = require('express')();
const bodyParser = require('body-parser');
const routes = require('./routes');
const { GIT_PROXY_SERVER_PORT: proxyHttpPort } = require('../config/env').Vars;

const options = {
  inflate: true,
  limit: '100000kb',
  type: '*/*',
};

// Setup the proxy middleware
proxyApp.use(bodyParser.raw(options));
proxyApp.use('/', routes);

const start = async () => {
  proxyApp.listen(proxyHttpPort, () => {
    console.log(`Proxy Listening on ${proxyHttpPort}`);
  });
  return proxyApp;
};

module.exports.start = start;
