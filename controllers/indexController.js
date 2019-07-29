const { Comment, Article } = require("../db")
const moment = require("moment")

const serverError = res => {
  res.status(500).send({
    code: 500,
    msg: "服务器内部错误"
  })
}

module.exports = {
  // 发表评论
  async post_comment(req, res) {
    // 获取数据
    const { author, content, articleId } = req.body
    // 判断数据
    try {
      // 判断文章id
      const articleRes = await Article.findOne({
        where: {
          id: articleId
        }
      })
      if (!articleRes) {
        return res.send({
          code: 400,
          msg: "文章id有误，请检查"
        })
      }
      // 发表评论
      await Comment.create({
        author,
        content,
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
        state: "待审核",
        articleId
      })
      res.send({
        code: 201,
        msg: "发表成功"
      })
    } catch (error) {
      serverError(res)
    }
  },
  // 评论列表
  async get_comment(req, res) {
    // 获取文章id
    const { articleId } = req.query
    try {
      // 判断文章是否存在
      const articleRes = await Article.findOne({
        where: {
          id: articleId
        }
      })
      // id异常提示
      if (!articleRes) {
        return res.send({
          code: 400,
          msg: "文章id有误,请检查"
        })
      }
      // 查询评论
      const commentRes = await Comment.findAll({
        where: {
          articleId,
          state: "已通过"
        },
        order: [
          // 根据id倒序
          ["id", "DESC"]
        ]
      })
      res.send({
        code:200,
        msg:'获取成功'
      })
    } catch (error) {
      console.log(error)
      serverError(res)
    }
  }
}
