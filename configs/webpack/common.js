// shared config (dev and prod)
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const src = path.join(__dirname, '../../src');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      // Single alias. Extra "@/<layer>" keys implied layers that do not exist
      // (contexts, services, shared, layout) and contradicted AGENTS.md.
      '@': src,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.html.ejs',
      favicon: './src/assets/img/react_logo.svg',
    }),
  ],
  performance: {
    hints: false,
  },
};
