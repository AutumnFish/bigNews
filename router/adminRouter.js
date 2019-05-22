// 导入express
const express = require('express')
// 导入路由
const router = express.Router()
// 导入控制器
const adminController = require('../controllers/adminController')

// 登录
router.post('/login',adminController.login)

// 暴露
module.exports = router