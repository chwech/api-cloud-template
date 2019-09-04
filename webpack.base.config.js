"use strict";
const path = require("path");
const glob = require("glob");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const debug = process.argv.indexOf("-d") !== -1;

let globmaths = glob.sync("./src/pages/**/main.js", {
  nodir: true
});

let entry = globmaths.reduce((obj, file) => {
  let dir = path.dirname(file);
  let key = dir.split("/");
  key = key[key.length - 1];
  obj[key] = file;
  return obj;
}, {});

function generateHtml(entry) {
  let html = [];
  Object.keys(entry).forEach(chunk => {
    html.push(
      new HtmlWebpackPlugin({
        filename: `${chunk}.html`,
        chunks: [chunk],
        template: path.resolve(`./public/index.html`) // 模板文件
      })
    );
  });
  return html;
}

let plugins = [
  // 使用插件自动生成html文件，并且自动把打包的js,css注入
  ...generateHtml(entry),
  // 使用vue-loader必须使用这个插件
  new VueLoaderPlugin()
];

module.exports = {
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
      },
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
      }
    ]
  },
  plugins: plugins
};
