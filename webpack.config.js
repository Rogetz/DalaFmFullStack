const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
var dotenvWebpack = require("dotenv-webpack")
//const webpack = require("webpack")
// I'm usingg the resolve.fallback so this is a bit invalid here.
// Remember that this polyfillwebpackPlugin copies the same style of adding fallbacks.
//const nodePolyfillWebPackPlugin = require("node-polyfill-webpack-plugin")

/*We are basically telling webpack to take index.js from entry. Then check for all file extensions in resolve. 
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/

module.exports={
    mode: "development", 
    entry: {
        index : "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name]main_bundle.js"
    },
    target: "web",
    devServer: {
        port: "9505",
        static: ["./public"],
        open: true,
        hot: true ,
        liveReload: true
    },
    resolve: {
        extensions: ['.js','.jsx','.json'] 
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,    //kind of file extension this rule should look for and apply in test
                exclude: /node_modules/, //folder to be excluded
                use: {
                    loader : 'babel-loader', //loader which we are going to use
                    options :{
                        "presets" : [
                            "@babel/preset-env","@babel/preset-react"
                        ]
                    }         
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            }
            ,//for the draft-js css file. The good thing is that it only fetches the one file in the node-modules not all of them.
            {
                test: /Draft.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            },
            {
                test: /(\.jpg|\.png|\.jpeg|.PNG)$/,
                type: "asset/resource"
            }
        ]
    },
    plugins : [
        new dotenvWebpack(),
        new HtmlWebpackPlugin({
            template : path.join(__dirname,"public/index.html")
        })
    ]

}