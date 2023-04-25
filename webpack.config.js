//hi

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point of our app
  entry: './client/index.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  mode: 'development',
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
  ],

  module: {
    rules: [
      // {
      //   test: /.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env', '@babel/preset-react'],
      //     },
      //   },
      // },
      {
        test: /\.(t|j)sx?$/,
        use: { loader: 'ts-loader' },
        exclude: /node_modules/,
      },

      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'client'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },

  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
    static: {
      // match the output path
      directory: path.resolve(__dirname, 'dist'),
      //match the output 'publicPath'
      publicPath: '/',
    },
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
};
