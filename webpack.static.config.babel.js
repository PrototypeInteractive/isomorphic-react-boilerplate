import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
    publicPath: './'
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
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false,
      sourceMap: true
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  externals: {
    jquery: 'jQuery'
  }
};

export default clientConfig;
