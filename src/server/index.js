import 'babel-polyfill';
import express from 'express';
import logger from './common/logger';
import headersConfig from './config/headers-config';
import parsersConfig from './config/parsers-config';
import serveConfig from './config/serve-config';

const app = express();

app.get('/health', (req, res) => {
  res.status(200).end();
});

app.get('/robots.txt', (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    res.end();
  }
  else {
    next();
  }
});

headersConfig(app);
parsersConfig(app);
serveConfig(app);

logger.info('----------------------------');
logger.info('☕️ ');
logger.info('Starting Server');
logger.info(`Environment: ${process.env.NODE_ENV}`);

const preferredPort = process.env.PORT || 8080;

app.listen(preferredPort, (error) => {
  if (!error) {
    logger.info(`📡  Running on port: ${preferredPort}`);
  }
});
