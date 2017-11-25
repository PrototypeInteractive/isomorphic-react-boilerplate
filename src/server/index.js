import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { clientConfig, serverConfig } from '../../webpack.config.babel';

const app = express();
const compiler = webpack(clientConfig);

// Tell express to use the webpack-dev-middleware and use the webpack.config.babel.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: serverConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

// Serve the files on port 3000.
app.listen(3000, () => {
  console.log('Example app listening on port 3000!\n');
});

console.log('Initializing server.');
