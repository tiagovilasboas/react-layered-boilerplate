// development config
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'development',
  // webpack-dev-server 5 injects the HMR client; do not add the old
  // webpack/hot/dev-server or webpack-dev-server/client entries.
  entry: '@/pages/index.tsx',
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
});
