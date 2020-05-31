var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)
conn.connect()
// var jsonWrite = function (res, ret) {
//   if (typeof ret === 'undefined') {
//     res.json({
//       code: '1',
//       msg: '操作失败'
//     })
//   } else {
//     res.json(ret)
//   }
// }


// 获取用户
router.get('/userList', (req, res) => {
  const params = req.query
  const start = Number(params.pageSize) * (Number(params.currentPage) - 1)
  const end = Number(params.pageSize) * Number(params.currentPage) - 1
  var sql = `select * from user where username like '%${params.username}%' and email like '%${params.email}%'`
  conn.query(sql, function (err, result) {
    if (err) {
      res.json({
        msg: '查询失败',
        data: err
      })
    }
    if (result) {
      res.json({
        status: 200,
        msg: '查询成功',
        list: result.slice(start, end),
        count: result.length,
        pageSize: params.pageSize,
        currentPage: params.currentPage
      })
    }
  })
})
// 删除用户
router.get('/delUser', (req, res) => {
  const params = req.query
  var sql = `delete from user where id = '${params.id}' `
  conn.query(sql, function (err, result) {
    if (err) {
      res.json({
        status: 500,
        msg: '删除失败',
        data: err
      })
    }
    if (result) {
      res.json({
        status: 200,
        msg: '删除成功',
        data: result
      })
    }
  })
})
// 重置用户密码
router.get('/resetUser', (req, res) => {
  const params = req.query
  var sql = `update user set password='123456' where id = '${params.id}' `
  conn.query(sql, function (err, result) {
    if (err) {
      res.json({
        status: 500,
        msg: '重置失败',
        data: err
      })
    }
    if (result) {
      res.json({
        status: 200,
        msg: '重置用户密码成功',
        data: result
      })
    }
  })
})

// 获取评论
router.get('/commentList', (req, res) => {
  const params = req.query
  const start = Number(params.pageSize) * (Number(params.currentPage) - 1)
  const end = Number(params.pageSize) * Number(params.currentPage) - 1
  var sql = `select comment.*,part.title from comment,part  where comment.articleId = part.id and userName like '%${params.userName}%' and title like '%${params.title}%'`
  conn.query(sql, function (err, result) {
    if (err) {
      res.json({
        msg: '查询失败',
        data: err
      })
    }
    if (result) {
      res.json({
        status: 200,
        msg: '查询成功',
        list: result.slice(start, end),
        count: result.length,
        pageSize: params.pageSize,
        currentPage: params.currentPage
      })
    }
  })
})
// 删除评论
router.get('/delComment', (req, res) => {
  const params = req.query
  var sql = `delete from comment where id = '${params.id}' `
  conn.query(sql, function (err, result) {
    if (err) {
      res.json({
        status: 500,
        msg: '删除失败',
        data: err
      })
    }
    if (result) {
      res.json({
        status: 200,
        msg: '删除成功',
        data: result
      })
    }
  })
})
module.exports = router