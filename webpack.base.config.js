"use strict";
const path = require("path");
const glob = require("glob");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.styl(us)?$/,
        use: ["vue-style-loader", "css-loader", "stylus-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: plugins
};
