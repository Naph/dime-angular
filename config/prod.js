const path = require('path');
const webpack = require('webpack');
const AotPlugin = require('@ngtools/webpack').AotPlugin;

module.exports = {
  module: {
    rules: [
      { test: /\.ts$/, loader: '@ngtools/webpack' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new AotPlugin({
      tsConfigPath: path.resolve(__dirname, 'tsconfig.aot.json'),
      entryModule: path.resolve(__dirname, 'src/app/app.module#AppModule')
    })
  ]
};
