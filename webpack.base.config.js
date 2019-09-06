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
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader", "less-loader"]
      },
      {
        test: /\.styl(us)?$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader", "stylus-loader"]
      },
      // 处理图片资源路径
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: 'image'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192 // 当小于8192字节时，会把图片转化为base64数据内联。大于此值的图片默认交由file-loader处理，可通过fallback选项设置其它loader
            }
          }
        ]
      }
    ]
  },
  plugins: plugins
};
