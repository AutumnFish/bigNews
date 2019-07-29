const { Comment } = require("../db")

const serverError = res => {
  res.status(500).send({
    code: 500,
    msg: "服务器内部错误"
  })
}

module.exports = {
  // 评论审核通过
  async pass(req, res) {
    // 获取id
    const { id } = req.body
    try {
      // 查询数据
      const commentRes = await Comment.findOne({
        where: {
          id
        }
      })
      // id判断
      if (!commentRes) {
        res.send({
          code: 400,
          msg: "id有误,请检查"
        })
      }
      // 修改评论状态
      const updateRes = await Comment.update(
        {
          state: "已批准"
        },
        {
          where: {
            id
          }
        }
      )
      if (updateRes[0] == 1) {
        res.send({
          msg: "已批准",
          code: 200
        })
      } else {
        res.send({
          msg: "已批准，不要重复操作",
          code: 400
        })
      }
    } catch (error) {
      serverError(res)
    }
  }
}
