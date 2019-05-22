const fs = require('fs')
const path = require('path')
// 基地址
const basePath = path.join(__dirname, '../db')

// 读取数据
module.exports = {
  getArticle() {
    try {
      return JSON.parse(
        fs.readFileSync(path.join(basePath, 'article.json'), 'utf-8')
      )
    } catch (err) {
      const article = [
        {
          id: 1,
          title: '西兰花好好吃',
          intro: '多次西兰花有益身心健康',
          cover:
            'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2189299806,3304117673&fm=179&app=42&f=JPEG?w=121&h=140',
          type: '1',
          read: '10',
          comment: '10',
          date: '2019-5-22'
        },
        {
          id: 2,
          title: '花菜也不错哦',
          intro: '他是西兰花的兄弟肯定好吃啦',
          cover:
            'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2946378002,1623249294&fm=58&bpow=700&bpoh=528',
          type: '2',
          read: '11',
          comment: '16',
          date: '2019-5-22'
        }
      ]
      fs.writeFileSync(
        path.join(basePath, 'article.json'),
        JSON.stringify(article)
      )
      return article
    }
  },
  getUser() {
    try {
      return JSON.parse(
        fs.readFileSync(path.join(basePath, 'user.json'), 'utf-8')
      )
    } catch (err) {
      const user = {
        nick_name: '小小黑',
        user_pic: '/static/02.jpg'
      }
      fs.writeFileSync(path.join('user.json'), JSON.stringify(user))
      return user
    }
  },
  // 评论
  getComments() {
    try {
      return JSON.parse(
        fs.readFileSync(path.join(basePath, 'comments.json'), 'utf-8')
      )
    } catch (err) {
      const comments = []
      fs.writeFileSync(path.join('comments.json'), JSON.stringify(comments))
      return comments
    }
  }
}
