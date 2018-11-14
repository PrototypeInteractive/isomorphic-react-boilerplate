import tools from './tools';
import data from './data';

export default (app) => {
  const urlPrefix = '/api/v1';

  tools(app, urlPrefix);
  data(app, urlPrefix);

  // Show 404 for unhandled api requests at this point
  app.get(`${urlPrefix}/*`, (req, res) => {
    res.status(404).end();
  });
};
