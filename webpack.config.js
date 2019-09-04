"use strict";
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const glob = require("glob");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const debug = process.argv.indexOf("-d") !== -1;

let plugins = [
  new UglifyJsPlugin({
    uglifyOptions: {
      output: {
        comments: false
      }
    }
  }),
  new VueLoaderPlugin() // 使用vue-loader必须使用这个插件
];

let globmaths = glob.sync("./src/pages/*.js", {
  nodir: true
});

let entry = globmaths.reduce((obj, file) => {
  let filename = path.basename(file).split(".")[0];
  obj[filename] = ["babel-polyfill", file];
  return obj;
}, {});

module.exports = {
  mode: "production",
  entry: entry,
  output: {
    path: path.resolve(`./lib`),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        use: ["babel-loader"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.styl(us)?$/,
        use: ["vue-style-loader", "css-loader", "stylus-loader"]
      }
    ]
  },
  plugins: plugins
};
