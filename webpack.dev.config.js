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
  // 定义环境变量
  new webpack.DefinePlugin(e)
]

module.exports = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    compress: true, // gzip
    port: 9000,
    host: "0.0.0.0", // 让局域网里的网络可以通过ip访问此服务
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
