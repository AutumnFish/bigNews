const express = require("express")
const router = express.Router()
// 验证插件
const { check } = require("express-validator")

// 导入控制器
const commentController = reqlib("/controllers/commentController.js")

// 错误信息提示中间件
const { errorMsg } = reqlib("/utils/message")

// 注册路由
router.post(
  "/pass",
  [
    check("id")
      .not()
      .isEmpty()
  ],
  errorMsg,
  commentController.pass
)

module.exports = router
