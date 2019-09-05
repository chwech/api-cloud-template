"use strict";
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require('webpack')
const env = require('./env.development')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let e = {}
Object.keys(env).forEach(k => {
  e['process.env.' + k] = JSON.stringify(env[k])
})
let plugins = [
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "[name].css",
    chunkFilename: "[id].css"
  }),
  // 定义环境变量
  new webpack.DefinePlugin(e),
  // 打包前先清理
  new CleanWebpackPlugin(),
  // 压缩代码
  new UglifyJsPlugin({
    uglifyOptions: {
      output: {
        comments: false
      }
    }
  })
]
if (process.argv.includes('--analyze')) {
  plugins.push(new BundleAnalyzerPlugin())
}
module.exports = merge(baseWebpackConfig, {
  mode: "production",
  // 代码分离
  optimization: {
    // webpack默认配置
    // splitChunks: {
    //   chunks: 'async',
    //   minSize: 30000,
    //   maxSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 5,
    //   maxInitialRequests: 3,
    //   automaticNameDelimiter: '~',
    //   name: true,
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true
    //     }
    //   }
    // }
    // splitChunks: {
    //   chunks: 'initial', // async, initial, all. 顾名思义，async针对异步加载的chunk做切割，initial针对初始chunk，all针对所有chunk。
    //   minSize: 30000,
    //   maxSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 5,
    //   maxInitialRequests: 3,
    //   automaticNameDelimiter: '~',
    //   name: true,
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true
    //     }
    //   }
    // }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              // publicPath: '../'
            }
          },
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
