var path = require('path');
var webpack = require('webpack');
var getEntry = require('./bin/util').getEntry;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: getEntry(path.resolve(__dirname, 'src/*.js')),
    output: {
        path: path.resolve('dist'),
        publicPath: '../dist', // 如果不配置，htmlwebpackplugin会用相对路径计算
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'umd'
    },
    module: {
    	// loaders
        rules: [{
            test: /\.css/,
            // use: ['style-loader', 'css-loader'],
            loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }]
    },
    plugins: [
        new webpack.BannerPlugin('this is my work.'),
        new webpack.optimize.CommonsChunkPlugin({
        	name: 'common',
        	filename: '[name].js'
        }),
        new ExtractTextPlugin({
        	filename: '[name].css',
        	allChunks: true
        }),
        new HtmlPlugin({
        	template: path.resolve('doc/template/index.html'),
        	filename: 'webpack-index.html',
        	chunks: ['common', 'dialog']
        })
    ],
    externals: {
        jquery: 'window.jQuery'
    }
}