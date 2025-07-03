// shared config (dev and prod)
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.join(__dirname, '../../src'),
      '@/components': path.join(__dirname, '../../src/components'),
      '@/hooks': path.join(__dirname, '../../src/hooks'),
      '@/contexts': path.join(__dirname, '../../src/contexts'),
      '@/modules': path.join(__dirname, '../../src/modules'),
      '@/pages': path.join(__dirname, '../../src/pages'),
      '@/services': path.join(__dirname, '../../src/services'),
      '@/shared': path.join(__dirname, '../../src/shared'),
      '@/utils': path.join(__dirname, '../../src/utils'),
      '@/layout': path.join(__dirname, '../../src/layout'),
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
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': '#000000',
      },
    }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  performance: {
    hints: false,
  },
};
