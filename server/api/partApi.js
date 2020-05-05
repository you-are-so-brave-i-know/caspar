var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')
// 连接数据库
var conn = mysql.createConnection(models.mysql)
conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}
// 获取所有摄影类型
router.get('/all_photography', (req, res) => {
  var sql = $sql.part.all_photography
  conn.query(sql, function (err, result) {
    if (err) {
      jsonWrite(res, err)
    }
    if (result) {
      // jsonWrite(res, result)
      res.json({
        msg: '查询所有摄影数据成功',
        list: result
      })
    }
  })
})
// 获取所有话题类型
router.get('/all_tips', (req, res) => {
  var sql = $sql.part.all_tips
  conn.query(sql, function (err, result) {
    if (err) {
      jsonWrite(res, err)
    }
    if (result) {
      // jsonWrite(res, result)
      res.json({
        msg: '查询所有话题数据成功',
        list: result
      })
    }
  })
})
// 获取所有咨询类型
router.get('/all_news', (req, res) => {
  var sql = $sql.part.all_news
  conn.query(sql, function (err, result) {
    if (err) {
      jsonWrite(res, err)
    }
    if (result) {
      // jsonWrite(res, result)
      res.json({
        msg: '查询所有摄影数据成功',
        list: result
      })
    }
  })
})
router.post('/likeit', (req, res) => {
  var params = req.body
  var sql = "UPDATE part set `like` = `like` + 1 where id = " + params.id
  conn.query(sql, function (err, result) {
    if (err) {
      jsonWrite(res, err)
    }
    if (result) {
      res.json({
        msg: 'success'
      })
    }
  })
})
// 查询文章内容详情 id
router.post('/article_detail', (req, res) => {
  var params = req.body
  var sql = `select * from part where id = ${params.id}`
  conn.query(sql, function (err, result) {
    if (err) {
      jsonWrite(res, err)
    }
    if (result) {
      res.json({
        msg: 'success',
        data: result[0]
      })
    }
  })
})
// 发表评论
router.post('/add_comment', (req, res) => {
  var params = req.body
  var sql = `insert into comment (id, userId, userName , articleId, content) values (0, ${params.userId}, '${params.userName}', ${params.articleId}, '${params.content}')`
  conn.query(sql, function (err, result) {
    if (err) {
      jsonWrite(res, err)
    }
    if (result) {
      res.json({
        msg: 'success',
      })
    }
  })
})
// 获取当前文章评论
router.post('/get_comment', (req, res) => {
  var params = req.body
  var sql = `select * from comment where articleId = ${params.id}`
  conn.query(sql, function (err, result) {
    if (err) {
      jsonWrite(res, err)
    }
    if (result) {
      res.json({
        msg: 'success',
        list: result
      })
    }
  })
})
module.exports = router