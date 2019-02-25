const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');

module.exports = webpackMerge(commonConfig(), {
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, './dist', './assets'),
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map',
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ],
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             loaders: ['babel-loader?cacheDirectory'],
    //             include: path.resolve('./src')
    //         }
    //     ]
    // },
    devServer: {
        contentBase: './dist'
    }
});
