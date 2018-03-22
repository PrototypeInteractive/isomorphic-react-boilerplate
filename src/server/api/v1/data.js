import cache from '../../common/cache';
import logger from '../../common/logger';
import errorHandler from './handle-error';

const testData = [];
for (let i = 1; i <= 100; i++) {
  testData.push({
    id: i,
    name: `Item ${i}`
  });
}

export default (app, urlPrefix) => {
  app.get(`${urlPrefix}/data`, async (request, response) => {
    try {
      const { skip, take } = request.query;

      const cacheKey = `data_${JSON.stringify({ skip, take })}`;

      logger.info(`Loading '${cacheKey}' from cache.`);

      let data = cache.get(cacheKey);
      if (!data) {
        logger.info(`Failed to load '${cacheKey}' from cache. Fetching from database.`);

        data = testData;
        if (skip > 0) {
          data = data.slice(skip);
        }
        if (take >= 0) {
          data = data.slice(0, take);
        }

        cache.set(cacheKey, data);

        logger.info(`Cached data as '${cacheKey}'.`);
      }

      response.json({
        status: 'Success',
        data
      });
    }
    catch (ex) {
      errorHandler(request, response, ex, true);
    }

    response.end();
  });
};
