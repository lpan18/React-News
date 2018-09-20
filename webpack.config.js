const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode:'development',
  entry: './src/js/root.js',
  output: {
    path: __dirname,
    filename: "./src/bundle.js"
  },
  module: {
     rules: [
       {
         test: /\.js$/,
         exclude: /node_modules/,
         use: {
           loader: "babel-loader"
         }
       },
       {
         test: /\.html$/,
         use: [
           {
             loader: "html-loader"
           }
         ]
       },
       {
         test: /\.css$/,
         // webpack从下往上执行，故先执行css-loader再执行style-loader两者书写顺序不可颠倒
         use: [{
                loader: "style-loader"
              },
              {
                loader: "css-loader",
              }]
       },
       {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }
     ]
   },
   plugins: [
     new HtmlWebPackPlugin({
       template: "./index.html",
       filename: "./index.html"
     })
   ]
};
