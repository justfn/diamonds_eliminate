const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');



const webpackMerge = require("webpack-merge")
const common = require("./common.js")

module.exports = webpackMerge(common,{
  mode: 'development',
  devtool: '#source-map',
});

