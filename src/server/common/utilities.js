import moment from 'moment';
import logger from './logger';

const Utilities = {
  startTimer: (label, disableLogging) => {
    const result = {
      label,
      timestamp: moment()
    };

    if (!disableLogging) {
      logger.debug(`${label}: Operation started.`);
    }

    return result;
  },
  stopTimer: (timer, disableLogging) => {
    const duration = moment.duration(moment().diff(timer.timestamp));

    if (!disableLogging) {
      logger.debug(`${timer.label}: The operation took ${duration.asMilliseconds().toLocaleString()} ms.`); // eslint-disable-line no-console
    }

    return duration;
  },
  serializeCriticalCss: styles => {
    const uniqueStyles = [...new Set(styles)].filter(x => x !== '[object Object]');
    const result = uniqueStyles.join('');

    return result;
  }
};

export default Utilities;
