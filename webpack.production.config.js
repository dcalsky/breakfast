var rucksack = require('rucksack-css')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var poststylus = require('poststylus')
var path = require('path')

module.exports = {
  context: path.join(__dirname, './client'),
  entry: {
    app: './index.js',
    vendor: ['react', 'redux', 'moment', 'lodash', 'react-router']
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.[hash].js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader", "postcss-loader")
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
    new ExtractTextPlugin("styles.[hash].css"),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    }),
  ],
}
