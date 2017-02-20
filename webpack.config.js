const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = '/';

module.exports = (env) => webpackMerge(require('./config/' + env + '.js'), {
  entry: {
    polyfills: 'polyfills.ts',
    vendor: 'vendor.ts',
    main: 'main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath,
    filename: '[name].js',
    sourceMapFilename: '[name].map'
  },
  module: {
    rules: [{
      test: /\.html$/,
      loader: 'raw-loader'
    }, {
      test: /\.scss$/,
      loaders: ExtractTextPlugin.extract({
        fallback: 'style-loader', use: 'css-loader?-url!sass-loader'
      })
    }]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.scss'],
    modules: [
      path.resolve(__dirname, 'src'),
      "node_modules"
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: ['vendor', 'polyfills'] }),

    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    ),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      chunksSortMode: 'dependency'
    }),
    new CleanWebpackPlugin(['dist']),

    new ExtractTextPlugin('[name].css')
  ]
});
