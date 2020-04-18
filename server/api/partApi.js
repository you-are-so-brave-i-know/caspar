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
router.get('/allPhotography', (req, res) => {
  var sql = $sql.part.all_photography
  conn.query(sql, function (err, result) {
    if (err) {
      jsonWrite(res, err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 获取所有话题类型
router.get('/allTips', (req, res) => {
  var sql = $sql.part.all_tips
  conn.query(sql, function (err, result) {
    if (err) {
      jsonWrite(res, err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 获取所有咨询类型
router.get('/allNews', (req, res) => {
  var sql = $sql.part.all_news
  conn.query(sql, function (err, result) {
    if (err) {
      jsonWrite(res, err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
module.exports = router