const path = require('path');

module.exports = {
  module: {
    rules: [
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
};
