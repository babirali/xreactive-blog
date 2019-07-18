const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var REACT_APP_API_ENDPOINT = {
    production: "",
    development: "http://localhost:3022/api/",
}

var environment = process.env.NODE_ENV == 'production' ? 'production' : 'development';

module.exports = {
    entry: './src/index.tsx',
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.join(__dirname, '/dist'),
        chunkFilename: '[name].[chunkhash].js',
        filename: 'bundle.min.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.EnvironmentPlugin({
            REACT_APP_API_ENDPOINT: REACT_APP_API_ENDPOINT[environment],
            //NODE_ENV: API_URL[environment], // use 'development' unless process.env.NODE_ENV is defined
            DEBUG: false
        }),
        new MiniCssExtractPlugin({
            filename: '[chunkhash].css',
        })
    ],
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: -10
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            }
        },
        runtimeChunk: true
    },
}