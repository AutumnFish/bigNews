const { Article, Category, Comment } = require("../db")

const serverError = res => {
  res.status(500).send({
    code: 500,
    msg: "服务器内部错误"
  })
}
module.exports = {
  // 统计数据路由
  async info(req, res) {
    try {
      // 文章总数
      const totalArticle = await Article.count()
      let dayArticle = await Article.count({
        group: "date",
        attributes:['date'],
        order: [["date", "DESC"]]
      })
      const totalComment = await Comment.count()
      let dayComment = await Comment.count({
        group: "date",
        order: [["date", "DESC"]],
        attributes:['date']
      })
      // 计算每日文章数
      dayArticle = parseInt( totalArticle/dayArticle.length)
      // 计算每日评论数
      dayComment = parseInt( totalComment/dayComment.length)
      res.send({
        totalArticle,
        dayArticle,
        totalComment,
        dayComment
      })
    } catch (error) {
      serverError(res)
    }
  },
  async comment(req, res) {
    res.send("/comment")
  },
  async category(req, res) {
    try {
      let categoryRes = await Category.findAll({
        include: [
          {
            model: Article
          }
        ],
        attributes: ["name"]
      })
      //   res.send(categoryRes)
      categoryRes = JSON.parse(JSON.stringify(categoryRes))
      categoryRes.forEach(v => {
        v.articles = v.articles.length
      })
      res.send({
        code: 200,
        msg: "获取成功",
        date: categoryRes
      })
    } catch (error) {
      console.log(error)
      serverError(res)
    }
  },
  async article(req, res) {
    try {
      const articleRes = await Article.count({
        group: "date",
        attributes: ["date"]
      })
      //   res.send(articleRes)
      res.send({
        code: 200,
        msg: "获取成功",
        date: articleRes
      })
    } catch (error) {
      serverError(res)
    }
  }
}
