const path = require('path')
// 导入moment
const moment = require('moment')
// 导入提示
const message = require(path.join(__dirname, '../utils/message'))
// 导入配置
const config = require(path.join(__dirname, '../utils/config'))
// 获取用户信息
const db = require(path.join(__dirname, '../utils/db'))
// 导入fs
const fs = require('fs')

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
        }
      ]
    })
  },
  // 文章搜索
  search(req, res) {
    // 获取提交的数据
    const key = req.query.key || ''
    const type = req.query.type || ''
    const state = req.query.state || ''
    const page = req.query.page || 1
    const perpage = req.query.perpage || 6

    // 数据类型判断
    if (isNaN(page) || isNaN(perpage)) {
      message.invalidParameter(res)
      return
    }
    // 文章检索
    let article = db.getArticle()
    // 类型筛选
    article = article.filter(v => {
      // 类型筛选
      if (type == '') return true
      return v.type == type
    })
    // 状态筛选
    article = article.filter(v => {
      // 类型筛选
      if (state == '') return true
      return v.state == state
    })
    // 关键字
    article = article.filter(v => {
      // 类型筛选
      if (key == '') return true
      try {
        return v.title.indexOf(key) != -1 || v.intro.indexOf(key) != -1
      } catch (error) {
        return false
      }
    })

    res.send({
      msg: '搜索成功',
      code: 200,
      data: article
    })
  },
  // 文章发布
  article_publish(req, res) {
    // 获取数据
    const title = req.body.title || ''
    const type = req.body.type || 1
    const date = req.body.date || moment().format('YYYY-MM-DD')
    const intro = req.body.intro || ''
    let cover
    // 允许的图片类型
    if (!req.file) {
      res.send({
        msg: '封面不能为空哦',
        code: 400
      })
      return
    } else if (
      fs.size > 1024 * 1024 ||
      ['image/gif', 'image/png', 'image/jpeg'].indexOf(req.file.mimetype) == -1
    ) {
      res.send({
        msg: '文件大小或类型不对，请检查',
        code: 400
      })
      fs.unlinkSync(path.join(__dirname, '../', req.file.path))
      return
    }
    // 标题判断
    if (!title) {
      res.send({
        msg: '标题不能为空哦',
        code: 400
      })
      return
    }
    // 标题判断
    if (!type) {
      res.send({
        msg: '类型不能为空哦',
        code: 400
      })
      return
    }
    // 设置封面
    cover = config.serverAddress+`/static/articles/${req.file.filename}`
    // 获取文章
    if (
      db.addArticle({
        title,
        intro,
        cover,
        type,
        date
      })
    ) {
      res.send({
        msg: '发布成功',
        code: 201
      })
    } else {
      res.send({
        msg: '发布失败',
        code: 400
      })
    }
    // 类型判断
    // res.send(req.file)
  },
  // 文章编辑
  article_edit(req, res) {
    const id = req.body.id
    // 获取数据
    const title = req.body.title
    const type = req.body.type
    const intro = req.body.intro
    let cover

    // id不能为空
    if (!id || isNaN(id)) {
      res.send({
        msg: 'id不能为空',
        code: 400
      })
      return
    }
    // 标题判断
    if (!title) {
      res.send({
        msg: '标题不能为空哦',
        code: 400
      })
      return
    }
    // 标题判断
    if (!type) {
      res.send({
        msg: '类型不能为空哦',
        code: 400
      })
      return
    }

    // 允许的图片类型
    if (req.file) {
      if (
        fs.size > 1024 * 1024 ||
        ['image/gif', 'image/png', 'image/jpeg'].indexOf(req.file.mimetype) ==
          -1
      ) {
        res.send({
          msg: '文件大小或类型不对，请检查',
          code: 400
        })
        fs.unlinkSync(path.join(__dirname, '../', req.file.path))
        return
      }
    }
    // 设置封面
    cover = config.serverAddress+`/static/articles/${req.file.filename}`
    // 修改文章
    if (db.editArticle({ id, title, type, intro, cover })) {
      res.send({
        msg: '修改成功',
        code: 200
      })
    } else {
      res.send({
        msg: '修改失败，请检查参数',
        code: 400
      })
    }

    // 类型判断
    // res.send(req.file)
  },
  // 文章删除
  article_delete(req, res) {
    // 获取id
    if (!req.query.id) {
      res.send({
        msg: 'id不能为空',
        code: 400
      })
      return
    }
    // 获取id
    const id = req.query.id
    if (id > db.getArticle().length || isNaN(id)) {
      res.send({
        msg: 'id无效,请检查',
        code: 400
      })
      return
    }

    // 软删除
    if (db.editArticle({ id, isDelete: true })) {
      res.send({
        msg: '删除成功',
        code: 200
      })
    } else {
      res.send({
        msg: '删除失败，请检查',
        code: 200
      })
    }
  }
}
