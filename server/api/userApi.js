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
// 增加用户
router.post('/addUser', (req, res) => {
  var sql = $sql.user.add
  var params = req.body
  console.log(params)
  conn.query(sql, [params.email, params.username, params.password], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
//登录请求
router.post('/signin', (req, res) => {
  var params = req.body
  // 查询邮箱账户信息
  var sql = `select * from user where email = '${params.email}'`
  // 更新用户状态
  var sql2 = `UPDATE user set state = 1 where email ='${params.email}'`
  // 登录类型为用户时
  // 更新用户状态
  var setstate = function () {
    conn.query(sql2, function (err, result) {
      if (err) {
        console.log(err)
      }
      if (result) {
        console.log('用户登录成功')
      }
    })
  }
  // 匹配密码
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      if (result.length === 0) {
        res.json({
          result: 400,
          msg: '用户账号不存在'
        })
      } else {
        if (params.password === result[0].password) {
          res.json({
            result: 200,
            msg: '登录成功',
            data: result[0] ? result[0] : {}
          })
          setstate()
        } else {
          res.json({
            result: 400,
            msg: '用户密码错误'
          })
        }
      }
    }
  })
})
// 获取当前登录的用户
router.get('/nowuser', (req, res) => {
  var sql = $sql.user.nowuser
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 根据name注销用户
router.post('/logout', (req, res) => {
  var params = req.body
  var sql = `UPDATE user set state = 0 where username = '${params.username}'`
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 测试
router.post('/Test', (req, res) => {
  var sql = $sql.user.test
  var params = req.body
  console.log(params)
  conn.query(sql, [params.name, params.age], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 获取所有用户
router.get('/alluser', (req, res) => {
  var sql = $sql.user.all
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
//根据id查询用户名字
router.post('/getuser', (req, res) => {
  var params = req.body
  var sql = `select username from user where id = '${params.id}'`
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 修改用户信息
router.post('/edit', (req, res) => {
  var params = req.body
  var sql = `UPDATE user set username='${params.username}',password = '${params.password}',address='${params.address}',sex='${params.sex}' where id = ${params.id}`
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
module.exports = router