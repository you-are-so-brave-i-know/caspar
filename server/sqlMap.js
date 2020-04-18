// SQL语句查询
const sqlMap = {
  user: {
    all: 'select * from user',
  },
  part: {
    all_photography: 'select * from part where type = 1',
    all_tips: 'select * from part where type = 2',
    all_news: 'select * from part where type = 3'
  }
}
module.exports = sqlMap