module.exports = require('./lib');

'use strict';

const prerender = require('./lib');
const prMemoryCache = require('prerender-memory-cache');

const server = prerender({
  port: 3010,
  chromeFlags: [
    '--no-sandbox',
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--hide-scrollbars',
    '--disable-dev-shm-usage',
  ],
  forwardHeaders: true,
  chromeLocation: '/usr/bin/chromium-browser',
  pageLoadTimeout: 60 * 1000,
});

const memCache = Number(process.env.MEMORY_CACHE) || 0;
if (memCache === 1) {
  server.use(prMemoryCache);
}

// server.use(prerender.blacklist());
// server.use(prerender.pgSiteNotFoundChecker());
server.use(prerender.httpHeaders());
server.use(prerender.removeScriptTags());

server.start();
