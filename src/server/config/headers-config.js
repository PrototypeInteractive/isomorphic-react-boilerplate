import helmet from 'helmet';
import compression from 'compression';

const headersConfig = app => {
  // Add header precautions for security
  app.use(helmet({
    hsts: false,
    noSniff: false
  }));

  // Set various global headers
  app.enable('trust proxy');
  app.disable('Server');
  app.disable('X-Powered-By');

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (process.env.NODE_ENV !== 'production') {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    }

    next();
  });

  app.use(compression());
};

export default headersConfig;
