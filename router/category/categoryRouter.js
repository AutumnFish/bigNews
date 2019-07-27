const express = require("express")
const router = express.Router()
// 验证插件
const { check, validationResult } = require("express-validator")

// 导入控制器
const categoryController = reqlib("/controllers/categoryController.js")

// 错误信息提示中间件
const errorMsg = (req, res, next) => {
  const valRes = validationResult(req)
  if (!valRes.isEmpty()) {
    let msg = ""
    valRes.errors.forEach(v => {
      msg += `${v.param},`
    })
    msg = msg.slice(0, -1)
    msg += " 参数有问题,请检查"
   return res.status(400).send({
      msg
    })
  }
  next()
}

// 新增文章分类
router.post(
  "/add",
  [
    check("name")
      .not()
      .isEmpty(),
    check("slug")
      .not()
      .isEmpty()
  ],
  errorMsg,
  categoryController.add
)

module.exports = router
