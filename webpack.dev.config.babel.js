import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackShellPlugin from 'webpack-shell-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

// Common .scss loaders

const commonStylesheetLoaders = [
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true
    }
  }
];


// Common configuation

const baseConfig = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel']
        }
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [
                  {
                    removeTitle: true
                  }
                ],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [],
  devtool: 'source-map',
  mode: 'development'
};


// Client and admin website configuration

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
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/public'),
    publicPath: '/'
  },
  module: {
    ...baseConfig.module,
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          ...commonStylesheetLoaders
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
      filename: './index.template.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['admin'],
      template: 'src/admin/index.html',
      filename: './admin/index.html'
    }),
    new FaviconsWebpackPlugin('./src/common/assets/icons/favicon.svg'),
    new webpack.DefinePlugin({
      'process.env.CLIENT_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  externals: {
    jquery: 'jQuery'
  }
};


// Server configuration

export const serverConfig = env => {
  const plugins = [
    ...baseConfig.plugins
  ];

  if (env && env.dev) {
    plugins.push(new WebpackShellPlugin({
      onBuildEnd: ['cross-env NODE_ENV=development DEBUG=api nodemon --ignore client.bundle.js ./dist/server/index.js'],
      dev: true
    }));
  }

  return {
    ...baseConfig,
    entry: './src/server/index.js',
    target: 'node',
    output: {
      filename: 'index.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist/server'),
      publicPath: '/'
    },
    module: {
      ...baseConfig.module,
      rules: [
        ...baseConfig.module.rules,
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'css-loader',
              options: {
                exportOnlyLocals: true
              }
            },
            ...commonStylesheetLoaders
          ]
        }
      ]
    },
    plugins,
    externals: [
      nodeExternals()
    ]
  };
};

export default [
  publicConfig,
  serverConfig
];
