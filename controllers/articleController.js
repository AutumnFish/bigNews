const { Category, Article } = require("../db")
const { baseUrl } = reqlib("/config")
const fs = require("fs")
const path = require("path")

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
    const { pid: id, pid } = req.body
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
      const { filename: cover } = req.file

      // 创建新文章
      const addResult = await Article.create({
        title,
        pid,
        date,
        content,
        cover
      })
      // 返回提示消息
      res.send({
        msg: "文章新增成功",
        code: 200
      })
    } catch (error) {
      serverError(res)
    }
  },
  // 根据id获取文章
  async search(req, res) {
    const { id } = req.query
    try {
      const findRes = await Article.findAll({
        where: {
          id
        }
      })
      if (findRes.length == 0) {
        return res.send({
          msg: "id有问题,请检查",
          code: 400
        })
      }
      // 返回获取到的数据
      const [data] = findRes
      data.cover = `${baseUrl}/${data.cover}`
      res.send({
        code: 200,
        msg: "获取成功",
        data
      })
    } catch (error) {
      serverError(res)
    }
  },
  // 编辑文章
  async edit(req, res) {
    // 获取文航id
    const { id } = req.body
    try {
      // 查询文章id
      const articleRes = await Article.findAll({
        where: {
          id
        }
      })
      // 检验文章id是否正确
      if (articleRes.length == 0) {
        return res.send({
          msg: "文章id有问题,请检查",
          code: 400
        })
      }
      // 获取分类id
      const { pid } = req.body
      // 判断文章分类id是否存在
      const categoryResult = await Category.findAll({
        where: {
          id: pid
        }
      })
      if (categoryResult.length == 0) {
        return res.send({
          code: 400,
          msg: "分类id不对，请检查"
        })
      }

      // 获取数据 除文件
      const { title, date, content } = req.body

      // 获取数据 文件
      if (!req.file) {
        await Article.update(
          {
            title,
            date,
            content,
            pid
          },
          {
            where: {
              id
            }
          }
        )
        res.send({
          code: 200,
          msg: "修改成功"
        })
      } else {
        const { filename: cover } = req.file

        const updateRes = await Article.update(
          {
            title,
            date,
            content,
            pid,
            cover
          },
          {
            where: {
              id
            }
          }
        )
        res.send({
          code: 200,
          msg: "修改成功"
        })
        // 删除之前的图片
        fs.unlinkSync(path.join(__dirname, "../uploads/", articleRes[0].cover))
      }

      // 获取最新的值
    } catch (error) {
      console.log(error)
      serverError(res)
    }
  }
}
