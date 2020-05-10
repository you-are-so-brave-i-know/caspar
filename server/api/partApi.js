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
// 获取用户个人的文章
router.post('/my_article', (req, res) => {
  const params = req.body
  var sql = `select part.*,user.userName from part,user where type = ${params.type} and part.authorId = ${params.userId}`
  console.log(sql)
  conn.query(sql, function (err, result) {
    if (err) {
      jsonWrite(res, err)
    }
    if (result) {
      res.json({
        msg: '查询成功',
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
// 获取关注列表
router.post('/getAttentionList', (req, res) => {
  var params = req.body
  var sql = `select * from attention where userId=${params.userId}`
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
// 关注
router.post('/attention', (req, res) => {
  var params = req.body
  var sql = `INSERT INTO attention (userId,parentId,parentName) VALUES(${params.userId},${params.parentId},'${params.parentName}') `
  conn.query(sql, function (err, result) {
    if (err) {
      jsonWrite(res, err)
    }
    if (result) {
      res.json({
        msg: '关注成功',
        data: result
      })
    }
  })
})
// 取消关注
router.post('/unsubscribe', (req, res) => {
  var params = req.body
  var sql = `DELETE FROM attention WHERE userId = ${params.userId} and parentId = ${params.parentId}`
  conn.query(sql, function (err, result) {
    if (err) {
      jsonWrite(res, err)
    }
    if (result) {
      res.json({
        msg: '取消关注成功',
        data: result
      })
    }
  })
})
module.exports = router