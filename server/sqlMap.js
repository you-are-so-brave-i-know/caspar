const sqlMap = {
  user: {
    add: 'insert into user (id, email, username, password) values(0, ?, ?, ?)',
    test: 'insert into test (id, name, age) values(0, ?, ?)',
    signin: 'select * from user where email = "1052088756@qq.com"',
    all: 'select * from user',
    nowuser: 'select * from user where state = 1'
  },
  note: {
    all: 'select * from note',
    hot: 'select * from note where visit > 50',
    mynote: 'select * from note where author = 4',
    newnote: 'insert into note (idnote, title, content, author) values(0, ?, ?, ?)'
  },
  question: {
    all: 'select * from question',
    add: 'insert into question (id, title, content, city, tag, author) values(0, ?, ?, ?, ?, ?)'
  },
  comment: {
    add: 'insert into comment (id, author, content, pid, tag) values(0, ?, ?, ?, ?)'
  },
  destination: {},
  part: {
    all_photography: 'select * from part where type = 1',
    all_tips: 'select * from part where type = 2',
    all_news: 'select * from part where type = 3',
    add_comment: "insert into comment (id, userId, userName , articleId, content) values (0, ?, ?, ?, ?)"
  }
}
module.exports = sqlMap