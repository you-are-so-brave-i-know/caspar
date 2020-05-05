## 仿汉服web页面

## 目录结构
```
mock:          模拟接口数据
node_modules:  npm包
dist:          打包存放目录
server:{
    api:           接口
    db.js          数据库连接配置
    server.js      服务器启动配置
    sqlMap.js      sql语句库
}
src:{
    api:接口
    assets:        静态文件
    components:    公共组件
    directive:     公共指令
    icons:         图标目录与封装
    lang:          语言
    layout：       页面主布局
    plugins:       插件配置
    router:        路由
    stroe:         vuex目录
    style:         统一样式
    utils:         公共方法
    views:         页面
    main.js        主配置
    permission.js  权限配置
}
views:{
    aricle:       文章页面
    error-page:   错误页
    home:         主页
    login：       登录页
}
vue.config.js      项目配置
```

## Project setup 安装插件
```
npm install
```

### Compiles and hot-reloads for development 运行项目
```
npm run serve
```

### Compiles and minifies for production 打包
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
### Start server  启动服务器
```
cd server
node server.js
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
