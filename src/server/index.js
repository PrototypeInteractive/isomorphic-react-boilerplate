import express from 'express';
import webpack from 'webpack';
import helmet from 'helmet';
import compression from 'compression';
import auth from 'basic-auth';
import bodyParser from 'body-parser';
import serveStatic from 'serve-static';
import debug from 'debug';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import 'babel-polyfill';
import { clientConfig } from '../../webpack.dev.config.babel';
import redirects from './redirects';

const log = debug('api');
const app = express();

app.get('/health', (req, res) => {
  res.status(200).end();
});

app.use(helmet({
  hsts: false,
  noSniff: false
}));

app.use(compression());

if (process.env.NODE_ENV !== 'production') {
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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (process.env.NODE_ENV !== 'production') {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  }

  next();
});

app.get('/robots.txt', (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    res.end();
  }
  else {
    next();
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(clientConfig);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: clientConfig.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));
  log('Running webpack dev and hot middleware!');
}
else {
  app.use(serveStatic('dist/client', {
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

redirects(app);

app.get('*', (req, res) => {
  res.status(404).end();
});

log('---------------------------');
log('☕️ ');
log('Starting Server');
log(`Environment: ${process.env.NODE_ENV}`);

const preferredPort = process.env.PORT || 8080;

app.listen(preferredPort, (error) => {
  if (!error) {
    log(`📡  Running on port: ${preferredPort}`);
  }
});
