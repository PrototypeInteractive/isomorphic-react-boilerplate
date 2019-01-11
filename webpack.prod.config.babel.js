import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import nodeExternals from 'webpack-node-externals';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackExcludeAssetsPlugin from 'html-webpack-exclude-assets-plugin';

process.traceDeprecation = true;

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
        loader: 'babel-loader'
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
  mode: 'production'
};


// Client and admin website configuration

export const publicConfig = {
  ...baseConfig,
  entry: {
    client: ['./src/client/index.js'],
    admin: ['./src/admin/index.js']
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
          {
            loader: MiniCssExtractPlugin.loader
          },
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
      filename: './index.template.html',
      excludeAssets: [/client.css/]
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['admin'],
      template: 'src/admin/index.html',
      filename: './admin/index.html'
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new FaviconsWebpackPlugin('./src/common/assets/icons/favicon.svg')
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      sourceMap: true,
      terserOptions: {
        mangle: true,
        ie8: false,
        keep_fnames: true
      }
    })],
    noEmitOnErrors: true,
    occurrenceOrder: true,
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
      ...baseConfig.module.rules,
      {
        test: /\.scss$/,
        use: [
          'to-string-loader',
          'css-loader',
          ...commonStylesheetLoaders
        ]
      }
    ]
  },
  externals: [
    nodeExternals()
  ]
};

export default [
  publicConfig,
  serverConfig
];
