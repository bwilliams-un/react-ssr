const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    name: 'client',
    target: 'web',
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr',
        'react-hot-loader/patch',
        path.resolve(__dirname, '../src/index.js')
    ],
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, '../build/client'),
        publicPath: '/static/client/'
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
        new WriteFilePlugin({
            test: /^(?!.*(hot)).*/
        }),
        new ExtractCssChunks(),
        // Vendor package of node_modules
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module, count) => {
                return module.context && /node_modules/.test(module.context);
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['bootstrap'], // webpack bootstrap code first
            filename: '[name].js',
            minChunks: Infinity
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle-analysis.html',
            openAnalyzer: false,
            logLevel: 'silent'
        }),
    ]
};