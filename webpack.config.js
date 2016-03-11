var rucksack = require('rucksack-css')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var path = require('path')


module.exports = {
  entry: {
    jsx: ['webpack-dev-server/client?http://0.0.0.0:3000', 'webpack/hot/only-dev-server', './client/index.js'],
    vendor: ['react']
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
    port: 3000
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: /client/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /client/,
        loader: 'style!css'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      inject: 'body'
    })
  ]
}
