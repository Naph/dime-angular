const path = require('path');
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [{
      test: /\.ts$/,
      loaders: ['awesome-typescript-loader', 'angular2-template-loader']
    }, {
      test: /\.html$/,
      loader: 'raw-loader'
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    )
  ]
};
