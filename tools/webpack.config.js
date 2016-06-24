'use strict'
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let babelLoader = {
  test: /\.jsx?$/,
  loaders: ['babel-loader'],
  exclude: /node_modules/
}

let webpackConfig = {
  entry: {
    app: [path.join(__dirname, '../routes/browser.js')]
  },
  output: {
    path: path.join(__dirname, '../public'),
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [
      babelLoader,
      {
        test: /\.md$/,
        loaders: ['html', 'markdown']
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('style.[contenthash].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, '../public/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
}

let prod = process.env.NODE_ENV === 'production'

if (prod) {
  webpackConfig.plugins.unshift(new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}))
  webpackConfig.module.loaders.unshift({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
  })
} else {
  webpackConfig.entry.app.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', 'webpack/hot/only-dev-server')
  webpackConfig.module.loaders.unshift({
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader']
  })
  babelLoader.loaders.unshift('react-hot')
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  webpackConfig.plugins.push(new webpack.NoErrorsPlugin())
}

module.exports = webpackConfig
