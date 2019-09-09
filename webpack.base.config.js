"use strict";
const path = require("path");
const glob = require("glob");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 约定src/pages/页面目录/main.js为该页面的入口文件
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
        filename: `${chunk}.html`, // 生成的html文件名
        chunks: [chunk], // 一个html对应一个入口chunk
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
    filename: "js/[name].[contenthash].js"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    extensions: [".vue", ".js"]
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
      // 处理图片资源路径
      {
        test: /\.(gif|jpe?g|png|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          fallback: 'file-loader',
          name: path.posix.join('img/[name].[hash:7].[ext]')
        }
      },
      // 处理文字资源
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          fallback: 'file-loader',
          name: path.posix.join('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: plugins
};
