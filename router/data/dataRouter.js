const express = require("express")
const router = express.Router()

// 错误信息提示中间件
const { errorMsg } = reqlib("/utils/message")
// 导入控制器
const dataController = reqlib("/controllers/dataController.js")


// 注册路由
// 路由 - 统计数据
router.get('/info',dataController.info)
router.get('/article',dataController.article)
router.get('/category',dataController.category)
router.get('/comment',dataController.comment)

// 暴露出去
module.exports = router