// SQL语句查询
const sqlMap = {
  user: {
    all: 'select * from user',
    add: 'insert into user (id, email, username, password) values(0, ?, ?, ?)',
    test: 'insert into test (id, name, age) values(0, ?, ?)',
    signin: 'select * from user where email = "1052088756@qq.com"',
    nowuser: 'select * from user where state = 1'
  },
  part: {
    all_photography: 'select * from part where type = 1',
    all_tips: 'select * from part where type = 2',
    all_news: 'select * from part where type = 3'
  }
}
module.exports = sqlMap