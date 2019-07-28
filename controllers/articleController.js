const { Category, Article } = require("../db")

const serverError = res => {
  res.status(500).send({
    code: 500,
    msg: "服务器内部错误"
  })
}

module.exports = {
  // 文章发布
  async publish(req, res) {
    // 获取分类id
    const { pid: id,pid } = req.body
    try {
      // 判断文章分类id是否存在
      const findResult = await Category.findAll({
        where: {
          id
        }
      })
      if (findResult.length == 0) {
        return res.send({
          code: 400,
          msg: "分类id不对，请检查"
        })
      }
      // 获取文章的其他信息
      const { title, date, content } = req.body
      // 获取封面
      const {filename:cover} = req.file

      // 创建新文章
      const addResult =  Article.create({title,pid,date,content,cover})
      // 返回提示消息
      res.send({
        msg:"文章新增成功",
        code:200
      })
    } catch (error) {
      serverError(res)
    }
  }
}
