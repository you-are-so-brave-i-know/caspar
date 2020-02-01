var path = require('path')
module.exports = {
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       prependData: `@import "@/style/index.scss";`
  //     }
  //   }
  // },
  // build: {
  //   env: require('./prod.env'),
  //   index: path.resolve(__dirname, '../dist/index.html'),
  //   assetsRoot: path.resolve(__dirname, '../dist'),
  //   assetsSubDirectory: 'static',
  //   assetsPublicPath: '/',
  //   productionSourceMap: true,
  //   // Gzip off by default as many popular static hosts such as
  //   // Surge or Netlify already gzip all static assets for you.
  //   // Before setting to `true`, make sure to:
  //   // npm install --save-dev compression-webpack-plugin
  //   productionGzip: false,
  //   productionGzipExtensions: ['js', 'css']
  // },
  dev: {
    // env: require('./dev.env'),
    port: 8003,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://127.0.0.1:3000/api/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    cssSourceMap: false
    //   // 部署应用包时的基本URL(域名后eg:htps:www.xxx.com/)
    //   // publicPath: process.env.NODE_ENV === 'production' ? '/dev/' : '/',
    //   // // build时生成的生产环境构建文件目录
    //   // outputDir: 'dist',
    //   // // 生成时静态文件放置目录
    //   // assetsDir: '',
    //   // // 指定index.html的生成输出路径
    //   // indexPath: '',
    //   // //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
    //   // filenameHashing: true,
    //   // // 在 multi-page 模式下构建应用
    //   // pages: {
    //   //   index: {
    //   //     // page 的入口
    //   //     entry: 'src/index/main.js',
    //   //     // 模板来源
    //   //     template: 'public/index.html',
    //   //     // 在 dist/index.html 的输出
    //   //     filename: 'index.html',
    //   //     // 当使用 title 选项时，
    //   //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //   //     title: 'Index Page',
    //   //     // 在这个页面中包含的块，默认情况下会包含
    //   //     // 提取出来的通用 chunk 和 vendor chunk。
    //   //     chunks: ['chunk-vendors', 'chunk-common', 'index']
    //   //   },
    //   //   // 当使用只有入口的字符串格式时，
    //   //   // 模板会被推导为 `public/subpage.html`
    //   //   // 并且如果找不到的话，就回退到 `public/index.html`。
    //   //   // 输出文件名会被推导为 `subpage.html`。
    //   //   subpage: 'src/subpage/main.js'
    //   // },
    //   // // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
    //   // lintOnSave: process.env.NODE_ENV !== 'production',
    //   // // 是否使用包含运行时编译器的 Vue 构建版本
    //   // runtimeCompiler: true || false,
    //   // // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
    //   // transpileDependencies: [] || RegExp,
  }
}