import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import externals from './src/server/utilities/externals';

const baseConfig = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  },
  plugins: [],
  devtool: 'source-map'
};

export const clientConfig = {
  ...baseConfig,
  entry: [
    './src/app/index.js'
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/app'),
    publicPath: '/'
  },
  module: {
    ...baseConfig.module,
    rules: [
      ...baseConfig.module.rules
    ]
  },
  plugins: [
    ...baseConfig.plugins,
    new HtmlWebpackPlugin({
      title: 'Output Management',
      inject: true,
      template: 'src/app/index.html'
    })
  ]
};

export const serverConfig = {
  ...baseConfig,
  entry: './src/server/index.js',
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/server'),
    publicPath: './'
  },
  module: {
    ...baseConfig.module,
    rules: [
      ...baseConfig.module.rules
    ]
  },
  plugins: [
    ...baseConfig.plugins
  ],
  externals
};

export default [
  clientConfig,
  serverConfig
];
