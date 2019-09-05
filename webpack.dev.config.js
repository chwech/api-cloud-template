"use strict";
const path = require("path");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const webpack = require('webpack')
const env = require('./env.development')
let e = {}
Object.keys(env).forEach(k => {
  e['process.env.' + k] = JSON.stringify(env[k])
})

let plugins = [
  new webpack.DefinePlugin(e)
]

module.exports = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "lib"),
    compress: true,
    port: 9000,
    host: "0.0.0.0",
    hot: true // 模块热替换
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1 }
          },
          "postcss-loader"
        ]
      },
    ]
  },
  plugins: plugins
});
