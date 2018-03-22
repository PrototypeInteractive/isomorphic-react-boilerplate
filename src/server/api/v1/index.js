import tools from './tools';
import data from './data';

export default (app) => {
  const urlPrefix = '/api/v1';

  tools(app, urlPrefix);
  data(app, urlPrefix);
};
