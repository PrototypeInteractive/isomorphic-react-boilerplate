import winston from 'winston';
import moment from 'moment';
import fs from 'fs';

const date = moment();
const timestamp = date.format('YYYY-MM-DD_hh-mm-ss');

// Create logs directory if it doesn't exist
fs.mkdir('./logs', () => { });

winston.configure({
  transports: [
    new (winston.transports.Console)({
      level: 'info',
      timestamp: true,
      colorize: true,
      humanReadableUnhandledException: true
    }),
    new (winston.transports.File)({
      filename: `./logs/${timestamp}_log.log`,
      level: 'info',
      timestamp: true,
      maxsize: 1024 * 1024 * 10, // 10 MB rolling log files
      prettyPrint: true,
      json: false
    })
  ]
});

export default {
  info: message => {
    winston.log('info', message);
  },
  warn: message => {
    winston.log('warn', message);
  },
  error: message => {
    winston.log('error', message);
  }
};
