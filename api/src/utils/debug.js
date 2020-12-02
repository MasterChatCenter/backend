const debug = require('debug');

const info = debug('app:info');
const dev = debug('app:dev');
const error = debug('app:error');

module.exports = {
  info,
  dev,
  error
}