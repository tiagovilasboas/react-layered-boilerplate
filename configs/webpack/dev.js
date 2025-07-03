// development config
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server.js',
    '@/pages/index.tsx',
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 8080,
    open: true,
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
});
