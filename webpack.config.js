'use strict';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const glob = require("glob")

const debug = process.argv.indexOf('-d') !== -1

let plugins = [
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
            comments: false,
        }
      }
    })
  ]

let globmaths =  glob.sync("./src/pages/*.js",{
  nodir:true,
})

let entry = globmaths.reduce((obj,file)=>{
  let filename = path.basename(file).split(".")[0]
  obj[filename] = ["babel-polyfill",file]
  return obj
},{})

module.exports = {
  mode: 'production',
     entry:entry,
    output: {
        path: path.resolve(`./lib`),
        filename: "[name].js",
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
      ]
    },
    plugins: plugins,
};
