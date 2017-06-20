const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
   app: path.join(__dirname, './src/'),
   libs: [
     'react',
     'redux',
     'mobx-react'
   ],
 },
 output: {
    filename: '[name].js',
    path: path.join(__dirname, '/dist'),
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader' },
      { test: /\.(jpg|svg|ttf)$/, loader: 'file-loader' },
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      chunks: ['Home', 'AboutMe', 'Payment'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'libs',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
