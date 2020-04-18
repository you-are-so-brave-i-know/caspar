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
      code: '404',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}
// 测试
router.get('/alluser', (req, res) => {
  var sql = $sql.user.all
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