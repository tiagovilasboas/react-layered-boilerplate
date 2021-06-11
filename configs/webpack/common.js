// shared config (dev and prod)
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.join(__dirname, '../../src'),
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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'imgs/[contenthash].[ext]',
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './template.html.ejs' })],
  externals: {
    react: 'React',
  },
  performance: {
    hints: false,
  },
};
