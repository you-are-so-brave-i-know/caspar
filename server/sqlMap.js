const sqlMap = {
  user: {
    add: 'insert into user (id, email, username, password) values(0, ?, ?, ?)',
    test: 'insert into test (id, name, age) values(0, ?, ?)',
    all: 'select * from user',
  },
  comment: {
    add: 'insert into comment (id, author, content, pid, tag) values(0, ?, ?, ?, ?)'
  },
  destination: {},
  part: {
    all_photography: 'select part.*,user.userName from part,user where type = 1 and part.authorId = user.id',
    all_tips: 'select * from part where type = 2',
    all_news: 'select * from part where type = 3',
    add_comment: "insert into comment (id, userId, userName , articleId, content) values (0, ?, ?, ?, ?)"
  }
}
module.exports = sqlMap