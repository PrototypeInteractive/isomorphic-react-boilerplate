import winston from 'winston';
import moment from 'moment';
import fs from 'fs';

const date = moment();
const timestamp = date.format('YYYY-MM-DD_hh-mm-ss');

fs.mkdir('./logs', () => { /* no-op */ });

const logger = winston.createLogger();

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.splat(),
      winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    level: process.env.LOG_LEVEL || 'error'
  }));
}
else {
  logger.add(new winston.transports.File({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.splat(),
      winston.format.printf(info => `${info.timestamp} - ${info.level}: ${info.message}`)
    ),
    filename: `./logs/${timestamp}_log.log`,
    level: process.env.LOG_LEVEL || 'error',
    maxsize: 1024 * 1024 * 10 // 10 MB rolling log files
  }));
}

export default {
  debug: (...args) => {
    logger.log('debug', ...args);
  },
  verbose: (...args) => {
    logger.log('verbose', ...args);
  },
  info: (...args) => {
    logger.log('info', ...args);
  },
  warn: (...args) => {
    logger.log('warn', ...args);
  },
  error: (...args) => {
    logger.log('error', ...args);
  }
};
