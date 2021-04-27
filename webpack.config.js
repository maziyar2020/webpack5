const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
let mode = "development";
if (process.env.NODE_ENV === "production") {
    mode = "production";
}
module.exports = {
    mode: mode,
    output: {
        path : path.resolve(__dirname , "dist"),
        assetModuleFilename: 'images/[hash][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.(png |jpe?g|gif|svg)$/i,
                type: "asset",
            },
            {
                // for all the type of style
                test: /\.(s[ac|c]ss$)/i,
                // test: /\.css$/i, only for css files
                use: [
                    {
                        loader: miniCssExtractPlugin.loader,
                        options: { publicPath: '' }
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [new CleanWebpackPlugin() , new miniCssExtractPlugin(), new htmlWebpackPlugin(
        {template : "./src/index.html"}
    )],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
    devServer: {
        contentBase: "./dist",
        hot: true,
    },
}