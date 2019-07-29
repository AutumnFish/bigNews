const express = require("express")
const router = express.Router()
// 验证插件
const { check } = require("express-validator")

// 导入控制器
const userController = reqlib("/controllers/userController.js")

// 错误信息提示中间件
const { errorMsg } = reqlib("/utils/message")

// 用户登录
router.post(
  "/login",
  [
    check("username")
      .not()
      .isEmpty(),
    check("password")
      .not()
      .isEmpty()
  ],
  errorMsg,
  userController.login
)

// 用户登出
router.post('/logout',userController.logout)

module.exports = router
