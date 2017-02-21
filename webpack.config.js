const {resolve} = require('path');
const webpack = require('webpack');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = function(env = 'dev') {
    return {
        entry: {
            index: resolve(__dirname, 'src', 'index.js')
        },
        output: {
            path: resolve(__dirname, 'dist'),
            filename: 'safereaper.min.js',
            libraryTarget: 'umd'
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
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new UnminifiedWebpackPlugin()
        ]
    };
};
