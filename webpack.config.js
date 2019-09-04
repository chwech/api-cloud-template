"use strict";
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");

module.exports = merge(baseWebpackConfig, {
  mode: "production",
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    })
  ]
});
