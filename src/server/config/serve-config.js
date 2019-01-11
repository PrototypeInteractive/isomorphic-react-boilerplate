import path from 'path';
import fs from 'fs';
import auth from 'basic-auth';
import webpack from 'webpack';
import serveStatic from 'serve-static';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import onHeaders from 'on-headers';
import uuid from 'uuid/v4';
import logger from '../common/logger';
import { publicConfig } from '../../../webpack.dev.config.babel';
import apiv1 from '../api/v1';
import redirects from '../redirects';
import configureStore from '../../client/state/configureStore';
import Utilities from '../common/utilities';

const serveConfig = app => {
  // Setup redirects
  redirects(app);

  // Log the request-response duration for benchmarking purposes
  if (process.env.LOG_LEVEL === 'debug') {
    app.use((req, res, next) => {
      if (req.originalUrl.indexOf('/__webpack_hmr') >= 0) {
        next();
        return;
      }

      const requestId = `[${uuid()} - ${req.method.toUpperCase()}] ${req.originalUrl}`;
      const timer = Utilities.startTimer(requestId);

      onHeaders(res, () => {
        Utilities.stopTimer(timer);
      });

      next();
    });
  }

  // Setup REST API
  apiv1(app);

  // Require password on staging for non-API requests
  if (process.env.NODE_ENV === 'integration') {
    const username = process.env.AUTH_USER || 'prototype';
    const password = process.env.AUTH_PASS || 'prototype';
    app.use((req, res, next) => {
      const user = auth(req);
      if (user === undefined || user.name !== username || user.pass !== password) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="prototype"');
        res.end('Unauthorized');
      }
      else {
        next();
      }
    });
  }

  // Serve files
  if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(publicConfig);

    app.use(webpackDevMiddleware(compiler, {
      logLevel: 'error',
      publicPath: publicConfig.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));
    logger.info('Running webpack dev and hot middleware!');
  }

  // Serve admin website and static files if it exists
  app.use(serveStatic('dist/public', {
    index: ['index.html'],
    dotfiles: 'ignore',
    maxAge: process.env.NODE_ENV === 'production' ? '7d' : '0d',
    setHeaders: (res, path) => {
      logger.debug('serve static: %j', path);

      if (serveStatic.mime.lookup(path) === 'text/html') {
        res.setHeader('Cache-Control', 'public, max-age=0');
      }
    }
  }));

  app.get('/admin*', (req, res) => {
    logger.debug('serve admin: %j', req.originalUrl);

    const filePath = path.join('.', 'dist', 'public', 'admin', 'index.html');
    res.sendFile(path.resolve(filePath));
  });

  // Serve client website with server-side rendering
  app.get('/*', async (req, res) => {
    logger.debug('serve client: %j', req.originalUrl);

    // Dynamically import App react component instead of statically importing the client app in the server code
    // to instruct webpack to craete a separate client bundle for server-side-rendering. This will prevent nodemon (during development)
    // from restarting the server when a client component is updated due to hot module reload. In production environment,
    // this dynamic import is cached so that any subsequent imports will not require a file-system operation.

    const { default: App } = await import(/* webpackChunkName: "client" */ '../../client/app');

    const cssList = [];
    const store = configureStore();
    const context = {
      addStyle: css => {
        cssList.push(css);
      }
    };

    const app = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    const cssString = Utilities.serializeCriticalCss(cssList);

    // Send redirect response if required
    if (context.url) {
      const statusCode = context.statusCode || 302;
      res.redirect(statusCode, context.url);
      return;
    }

    // Return preferred status code
    if (context.statusCode) {
      res.status(context.statusCode);
    }

    const storeState = store.getState();
    const indexFilePath = path.resolve('./dist/public/index.template.html');

    fs.readFile(indexFilePath, 'utf8', (err, data) => {
      if (err) {
        logger.error('Failed to load index template file', err);
        res.status(500).send('Internal server error. Template failed to load.');
        return;
      }

      const isCriticalCSSEnabled = process.env.NODE_ENV === 'production' && process.env.DISABLE_CRITICAL_CSS !== 'true' && !!cssString;

      const result = data
        .replace('{{Styles}}', isCriticalCSSEnabled ? `
            <style id="InlineCSS" type="text/css">${cssString}</style>
            <link rel="preload" href="/client.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
            <noscript><link rel="stylesheet" href="/client.css"></noscript>
          ` : '')
        .replace('<div id="app"></div>', `
            <div id="app">${app}</div>
          `)
        .replace('{{Scripts}}', `
            <script>
              window.__PRELOADED_STATE__ = ${JSON.stringify(storeState).replace(/</g, '\\u003c')}
            </script>
          `);
      res.send(result);
    });
  });
};

export default serveConfig;
