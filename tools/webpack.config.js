'use strict'
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let babelLoader = {
  test: /\.jsx?$/,
  loaders: ['babel'],
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
      },
      {
        test: /fonts.*\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^\/paints.*png$/),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('style.[contenthash].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}

let prod = process.env.NODE_ENV === 'production'

let getHtmlPlugins = function () {
  let routes = prod ? ['/', '/project', '/paint'] : ['/']
  return routes.map((route) => {
    return new HtmlWebpackPlugin({
      filename: path.join(__dirname, '../public', route, 'index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  })
}

webpackConfig.plugins = webpackConfig.plugins.concat(getHtmlPlugins())

if (prod) {
  webpackConfig.plugins.unshift(new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}))
  webpackConfig.module.loaders.unshift({
    test: /\.styl$/,
    loader: ExtractTextPlugin.extract(
      'style',
      'css?modules&importLoaders=1&localIdentName=[path][local]-[hash:base64:5]!stylus'
    )
  })
} else {
  webpackConfig.entry.app.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', 'webpack/hot/only-dev-server')
  webpackConfig.module.loaders.unshift({
    test: /\.styl/,
    loader: 'style!css?modules&importLoaders=1&localIdentName=[path][local]-[hash:base64:5]!stylus'
  })
  babelLoader.loaders.unshift('react-hot')
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  webpackConfig.plugins.push(new webpack.NoErrorsPlugin())
  webpackConfig.devtool = 'source-map'
}

module.exports = webpackConfig
