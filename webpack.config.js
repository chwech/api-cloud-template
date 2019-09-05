"use strict";
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require('webpack')
const env = require('./env.development')

let e = {}
Object.keys(env).forEach(k => {
  e['process.env.' + k] = JSON.stringify(env[k])
})

module.exports = merge(baseWebpackConfig, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin(e),
    new CleanWebpackPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    })
  ]
});
