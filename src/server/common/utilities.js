import moment from 'moment';
import logger from './logger';

const Utilities = {
  startTimer: (label) => {
    const result = {
      label,
      timestamp: moment()
    };

    logger.debug(`${label}: Operation started.`);

    return result;
  },
  stopTimer: (timer, disableLogging) => {
    const duration = moment.duration(moment().diff(timer.timestamp));

    if (disableLogging) {
      return duration;
    }

    logger.debug(`${timer.label}: The operation took ${duration.asMilliseconds().toLocaleString()} ms.`); // eslint-disable-line no-console

    return duration;
  }
};

export default Utilities;
