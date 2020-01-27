// node后端服务器启动配置文件
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const userApi = require('./api/userApi')
const noteApi = require('./api/noteApi')
const questionApi = require('./api/questionApi')
const commentApi = require('./api/commentApi')
const destinationApi = require('./api/destinationApi')
const searchApi = require('./api/searchApi')

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// 后端api路由
app.use('/api/user', userApi)
// 监听接口
app.listen(3000, () => {
  console.log('success listen at post :3000')
})