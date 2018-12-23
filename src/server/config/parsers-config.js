import bodyParser from 'body-parser';

const parsersConfig = app => {
  // Automatically parse body based on Content-Type of the request
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw({ limit: 2 * 1024 * 1024, type: 'application/octet-stream' })); // 2 MB max
};

export default parsersConfig;
