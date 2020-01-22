const path = require('path');
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'none', //Can also be development or production https://webpack.js.org/configuration/mode/
    entry: {
        app: './src/index.tsx',
    },

    output: {
        filename: 'main.js',
        publicPath: "",
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ["*", ".ts", ".tsx", ".js", ".jsx", ".CSS"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }

        ]
    },

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 3000,
        //TODO: enable the us of local IP
        hot: true
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'templates/index.html',
            favicon: 'static/img/favicon.png'
        }),
        new CleanWebpackPlugin(['dist'])
    ]

};