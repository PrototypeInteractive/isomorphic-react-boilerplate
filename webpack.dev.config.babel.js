import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackShellPlugin from 'webpack-shell-plugin';
import externals from './src/server/utilities/externals';

const baseConfig = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        plugins: ['react-hot-loader/babel']
      }
    }]
  },
  plugins: [],
  devtool: 'source-map',
  mode: 'development'
};

export const publicConfig = {
  ...baseConfig,
  entry: {
    client: [
      'webpack-hot-middleware/client',
      './src/client/index.js'
    ],
    admin: [
      'webpack-hot-middleware/client',
      './src/admin/index.js'
    ]
  },
  output: {
    filename: 'main.[name].js',
    path: path.resolve(__dirname, 'dist/public'),
    publicPath: '/'
  },
  resolve: {
    extensions: [...baseConfig.resolve.extensions, '.scss']
  },
  module: {
    ...baseConfig.module,
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [{
                  removeTitle: true
                }],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    ...baseConfig.plugins,
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['client'],
      template: 'src/client/index.html',
      filename: './index.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['admin'],
      template: 'src/admin/index.html',
      filename: './admin/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.CLIENT_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  },
  externals: {
    jquery: 'jQuery'
  }
};

export const serverConfig = env => {
  const plugins = [
    ...baseConfig.plugins
  ];

  if (env && env.dev) {
    plugins.push(new WebpackShellPlugin({
      onBuildEnd: ['cross-env NODE_ENV=development DEBUG=api nodemon ./dist/server/index.js'],
      dev: true
    }));
  }

  return {
    ...baseConfig,
    entry: './src/server/index.js',
    target: 'node',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist/server'),
      publicPath: '/'
    },
    module: {
      ...baseConfig.module,
      rules: [
        ...baseConfig.module.rules
      ]
    },
    plugins,
    externals
  };
};

export default [
  publicConfig,
  serverConfig
];
