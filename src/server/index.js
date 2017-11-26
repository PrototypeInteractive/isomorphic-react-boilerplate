import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { clientConfig, serverConfig } from '../../webpack.dev.config.babel';

const app = express();

app.get('/health', (req, res) => {
  res.status(200).end();
});

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(clientConfig);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: serverConfig.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));
}

app.listen(process.env.PORT || 3000, (error) => {
  if (!error) {
    console.log(`📡  Running on port: ${process.env.PORT || 3000} [${process.env.NODE_ENV}]`);
  }
});
