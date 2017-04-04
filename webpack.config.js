const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = '/';

module.exports = (env, api) => webpackMerge(require('./config/' + env + '.js'), {
  entry: {
    polyfills: 'polyfills.ts',
    vendor: 'vendor.ts',
    main: 'main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath,
    filename: 'js/[name].[hash].js',
    sourceMapFilename: 'js/[name].[hash].map'
  },
  module: {
    rules: [{
      test: /\.html$/,
      loader: 'raw-loader'
    }, {
      test: /\.scss$/,
      loaders: ExtractTextPlugin.extract({
        fallback: 'style-loader', use: 'css-loader?-url!resolve-url-loader!sass-loader?sourceMap'
      })
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader'
      })
    }, {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]'
      }
    }, {
      test: /\.(png|gif|jpe?g|svg)$/,
      exclude: path.resolve(__dirname, 'src/icons'),
      loader: 'file-loader',
      options: {
        name: 'images/[name].[ext]'
      }
    }, {
      test: /\.svg$/,
      include: path.resolve(__dirname, 'src/icons'),
      loaders: 'icon-maker-loader',
      options: {
        fontFamily: 'icon'
      }
    }]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: ['vendor', 'polyfills'] }),

    new webpack.DefinePlugin({
      'process.env': {
        'API_LOCATION': JSON.stringify(api || 'http://hostname/api/'),
        'NODE_ENV': JSON.stringify(env)
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.ejs'),
      chunksSortMode: 'dependency'
    }),
    new CleanWebpackPlugin(['dist']),

    new ExtractTextPlugin('css/[name].[chunkhash].css')
  ],
  devtool: 'source-map'
});
