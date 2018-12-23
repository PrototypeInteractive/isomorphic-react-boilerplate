import path from 'path';
import auth from 'basic-auth';
import webpack from 'webpack';
import serveStatic from 'serve-static';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import logger from '../common/logger';
import { publicConfig } from '../../../webpack.dev.config.babel';
import apiv1 from '../api/v1';
import redirects from '../redirects';

const serveConfig = app => {
  // Setup redirects
  redirects(app);

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
  else {
    app.use(serveStatic('dist/public', {
      index: ['index.html'],
      dotfiles: 'ignore',
      maxAge: process.env.NODE_ENV === 'production' ? '7d' : '0d',
      setHeaders: (res, path) => {
        if (serveStatic.mime.lookup(path) === 'text/html') {
          res.setHeader('Cache-Control', 'public, max-age=0');
        }
      }
    }));
  }

  app.get('/admin*', (req, res) => {
    const filePath = path.join('.', 'dist', 'public', 'admin', 'index.html');
    res.sendFile(path.resolve(filePath));
  });

  app.get('*', (req, res) => {
    const filePath = path.join('.', 'dist', 'public', 'index.html');
    res.sendFile(path.resolve(filePath));
  });

  // Show 404 for unhandled requests at this point
  // app.get('*', (req, res) => {
  //   res.status(404).end();
  // });
};

export default serveConfig;
