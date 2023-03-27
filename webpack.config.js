//hi

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point of our app
  entry: './client/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: 'development',
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'client'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],

    // resolve: {
    //   // Enable importing JS / JSX files without specifying their extension
    //   extensions: ['.js', '.jsx'],
    // },
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
