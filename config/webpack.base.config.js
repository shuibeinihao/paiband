'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        baselib: ['vue', 'chart.js', 'zepto', 'jutils'],
        app: [path.join(__dirname, '../src/main')]
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '',
        pathInfo: false
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'chart.js$': 'chart.js/dist/Chart.min.js',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'router': path.resolve(__dirname, '../src/router'),
            'pages': path.resolve(__dirname, '../src/pages'),
            'services': path.resolve(__dirname, '../src/services'),
            'plugin': path.resolve(__dirname, '../src/plugin'),
            'dbs': path.resolve(__dirname, '../src/dbs')
        }
    },
    devtool: 'inline-source-map',
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        noParse: [/Chart\.min\.js$/],
        loaders: [
            {
                test: /\.vue$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'css'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: path.join('static', 'images/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: path.join('static', 'fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: require.resolve('zepto'),
                loader: 'exports?window.Zepto!script'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'zepto'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
};
