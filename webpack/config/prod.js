const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');




const webpackMerge = require("webpack-merge")
const common = require("./common.js")

module.exports = webpackMerge(common,{
  mode: 'production',
  devtool: 'none',
  
  // plugins: [
  //   new UglifyJSPlugin({}),
  // ],
});

