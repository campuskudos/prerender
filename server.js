module.exports = require('./lib');

// library import
const prerender = require('./lib');

const server = prerender({
  followRedirects: true,
  chromeLocation: '/usr/bin/google-chrome',
  chromeFlags: [ '--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars' ],
  pageLoadTimeout: 30 * 1000,
  waitAfterLastRequest: 1 * 1000,
  followRedirects: true,
})

server.use(require('prerender-memory-cache'));
server.use(prerender.basicAuth());
server.start()