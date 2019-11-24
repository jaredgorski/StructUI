const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [__dirname + '/src/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ],
      },

    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject:   'body'
    }),
    new MiniCssExtractPlugin({
      filename: 'commons.css',
    }),
  ],
};
