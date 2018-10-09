import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import postcssRTL from 'postcss-rtl';
import Visualizer from 'webpack-visualizer-plugin';
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
  devtool: 'source-map',
  mode: 'production'
};

export const clientConfig = {
  ...baseConfig,
  entry: {
    client: ['./src/client/index.js'],
    admin: ['./src/admin/index.js']
  },
  output: {
    filename: 'main.[name].js',
    path: path.resolve(__dirname, 'dist/client'),
    publicPath: '/'
  },
  module: {
    ...baseConfig.module,
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              postcssRTL()
            ],
            sourceMap: true
          }
        },
        {
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
    new Visualizer({
      filename: '../../prod-bundle-stats.html'
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        sourceMap: true,
        mangle: true,
        ie8: false,
        keep_fnames: true
      }
    })],
    noEmitOnErrors: true
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  externals: {
    jquery: 'jQuery'
  }
};

export const serverConfig = {
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
  plugins: [
    ...baseConfig.plugins
  ],
  externals
};

export default [
  clientConfig,
  serverConfig
];
