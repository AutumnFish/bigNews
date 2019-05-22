const path = require('path')
// 导入moment
const moment = require('moment')
// 导入提示
const message = require(path.join(__dirname, '../utils/message'))
// 导入配置
const config = require(path.join(__dirname, '../utils/config'))
// 获取用户信息
const db = require(path.join(__dirname, '../utils/db'))
module.exports = {
  // 用户登录
  login(req, res) {
    // 数据获取
    const user_name = req.body.user_name || ''
    const password = req.body.password || ''
    // 类型判断
    if (user_name === 'admin' && password === '123456') {
      res.send({
        msg: '登录成功',
        code: 200
      })
    } else {
      res.send({
        msg: '用户名或密码错误',
        code: 400
      })
    }
  },
  // 用户登出
  logout(req, res) {
    res.send({
      msg: '登出成功',
      code: 200
    })
  },
  // 获取用户信息
  getuser(req, res) {
    // 获取用户信息
    res.send({
      msg: '获取成功',
      code: 200,
      data: db.getUser()
    })
  },
  // 获取文章数量统计
  article_count(req, res) {
    res.send({
      msg: '文章统计获取成功',
      code: 200,
      data: {
        all_count: db.getArticle().length,
        day_count: 5
      }
    })
  },
  // 获取评论数量统计
  comment_count(req, res) {
    res.send({
      msg: '评论数量获取成功',
      code: 200,
      data: {
        all_count: db.getComments().length,
        day_count: 10
      }
    })
  },
  // 月新增文章获取
  month_article_count(req, res) {
    // 根据今天日期获取一个月的
    // 生成日期数组
    let data = []
    for (let i = 30; i >= 1; i--) {
      data.push({
        day: moment()
          .subtract(i, 'days')
          .format('YYYY-MM-DD'),
        day_count: parseInt(Math.random() * 300)
      })
    }

    res.send({
      msg: '月新增文章数获取成功',
      code: 200,
      data
    })
  },
  // 获取类型对应文章数
  article_category_count(req, res) {
    res.send({
      msg: '类型统计数据获取成功',
      code: 200,
      data: [
        {
          type: '科技',
          all_count: 1
        },
        {
          type: '财经',
          all_count: 1
        }
      ]
    })
  },
  // 月文章访问量
  article_category_visit(req, res) {
    res.send({
      msg: '月文章访问量获取成功',
      code: 200,
      data: [
        {
          month: '1月',
          all_count: [
            {
              type: '科技',
              count: 237
            },
            {
              type: '财经',
              count: 237
            }
          ]
        },
        {
          month: '2月',
          all_count: [
            {
              type: '科技',
              count: 237
            },
            {
              type: '财经',
              count: 237
            }
          ]
        },
        {
          month: '三月',
          all_count: [
            {
              type: '科技',
              count: 237
            },
            {
              type: '财经',
              count: 237
            }
          ]
        },
        {
          month: '四月',
          all_count: [
            {
              type: '科技',
              count: 123
            },
            {
              type: '财经',
              count: 456
            }
          ]
        },
        {
          month: '五月',
          all_count: [
            {
              type: '科技',
              count: 99
            },
            {
              type: '财经',
              count: 300
            }
          ]
        },
      ]
    })
  }
}
