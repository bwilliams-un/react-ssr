const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
    name: 'server',
    target: 'node',
    devtool: 'source-map',
    entry: [
        path.resolve(__dirname, '../server/render.js')
    ],
    output: {
        path: path.resolve(__dirname, '../build/server'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        'react-dom/server': 'commonjs react-dom/server'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractCssChunks.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        }
                    ]
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.css']
    },
    plugins: [
        new WriteFilePlugin(),
        new ExtractCssChunks(),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ]
};