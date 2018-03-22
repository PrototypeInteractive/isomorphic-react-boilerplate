import cache from '../../common/cache';
import logger from '../../common/logger';
import errorHandler from './handle-error';

export default (app, urlPrefix) => {
  app.get(`${urlPrefix}/tools/clear-cache`, async (request, response) => {
    try {
      logger.info('Attempting to clear cache.');
      cache.reset();
      logger.info('Successfully cleared cache.');

      response.json({
        status: 'Success'
      });
    }
    catch (ex) {
      errorHandler(request, response, ex, true);
    }

    response.end();
  });
};
