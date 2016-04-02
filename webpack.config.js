var rucksack = require('rucksack-css')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var poststylus = require('poststylus')
var path = require('path')


module.exports = {
  entry: {
    jsx: ['webpack-dev-server/client?http://0.0.0.0:3002', 'webpack/hot/only-dev-server', './client/index.js'],
    vendor: ['react', 'redux', 'moment', 'lodash', 'react-router', 'avoscloud-sdk']
  },
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    colors: true,
    port: 3002
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      }, {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  stylus: {
    use: [
      poststylus([ 'autoprefixer', 'rucksack-css' ])
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      inject: 'body'
    })
  ]
}
