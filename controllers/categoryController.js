const { Category } = require("../db")

module.exports = {
  // 新增
  async add(req, res) {
    const { name, slug } = req.body
    // 创建新分类
    try {
      let result = await Category.create({ name, slug })
      // console.log(result)
      // res.send(result)
      res.status(201).send({
        code: 201,
        msg: "创建成功"
      })
    } catch (error) {
      //  res.send(error.errors)
      if (error.errors[0].type == "unique violation") {
        let msg = error.errors[0].path + " 已存在,请重新提交"
        res.status(400).send({
          code: 400,
          msg
        })
      }
      // res.send(400).send({
      //   code:400,
      //   msg:''
      // })
    }
  },
  // 获取列表
  async list(req, res) {
    try {
      let data = await Category.findAll()
      res.send({
        code: 200,
        msg: "获取成功",
        data
      })
    } catch (error) {
      res.status(500).send({
        code: 500,
        msg: "服务器内部错误"
      })
    }
  },
  // 根据id搜索文章分类
  async search(req, res) {
    const { id } = req.query
    try {
      let data = await Category.findAll({
        where:{
          id
        }
      })
      res.send({
        code:200,
        msg:'获取成功',
        data
      })
     
    } catch (error) {
      res.status(500).send({
        code:500,
        msg:'服务器内部错误'
      })
    }
  }
}
