const { resolve } = require('path')
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')

module.exports = function(env = 'dev') {
  return {
    mode: 'production',
    entry: {
      index: resolve(__dirname, 'src', 'index.js')
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'safereaper.min.js',
      libraryTarget: 'umd',
      globalObject: `(typeof window !== 'undefined' ? window : this)`
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader'
          },
          exclude: /(node_modules)/
        }
      ]
    },
    plugins: [new UnminifiedWebpackPlugin()]
  }
}
