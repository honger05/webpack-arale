
var webpack = require('webpack')
var path = require('path')
var buildPath = path.resolve(__dirname, 'build')
var nodeModulesPath = path.resolve(__dirname, 'node_modules')
var TransferWebpackPlugin = require('transfer-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    devServer: 'webpack/hot/dev-server',
    index: './src/app/components/index.js',
    detail: './src/app/components/detail.js'
  },
  output: {
    path: buildPath,
    filename: './js/[name].bundle.js',
    chunkFilename: './js/[id].chunk.js'
  },
  devServer: {
    contentBase: 'src/www',
    devtool: 'eval',
    hot: true,
    inline: true,
    port: 3000
  },
  devtool: 'eval',
  resolve: {
    extensions: ['', '.js', '.json', '.coffee']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      title: '小蚂蚁 - 保护米特卖平台',
      filename: 'index.html',
      template: './src/tmpl/index.html',
      chunks: ['index'],
      inject: 'body'
    }),

    new HtmlWebpackPlugin({
      title: '小蚂蚁',
      filename: 'detail.html',
      template: './src/tmpl/detail.html',
      chunks: ['detail'],
      inject: 'body'
    }),

    new TransferWebpackPlugin([
      {from: 'www'}
    ], path.resolve(__dirname, "src"))

  ],
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },{
        test: /\.scss$/,
        loader: 'style!css!sass'
      },{
        test: /\.css$/,
        loader: 'style!css'
      },{
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      },{
        test: /\.ttf$/,
        loader: 'url?limit=100000'
      }
    ]
  }
}
